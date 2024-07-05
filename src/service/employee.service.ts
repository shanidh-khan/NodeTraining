import { EntityNotFoundError } from "typeorm";
import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";
import Role from "../utils/role.enum";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { jwtPayLoad } from "../utils/jwtPayload";
import { JWT_TOKEN, JWT_VALIDITY } from "../utils/constants";

class EmployeeService {
	constructor(private employeeRepository: EmployeeRepository) {}

	async getAllEmployees() {
		return this.employeeRepository.find();
	}

	async getEmployeeById(id: number) {
		return this.employeeRepository.findOneBy({ id });
	}

	async createEmployee(
		name: string,
		email: string,
		age: number,
		address: Address,
		password: string,
		role: Role
	) {
		const newEmployee = new Employee();
		newEmployee.email = email;
		newEmployee.name = name;
		newEmployee.age = age;
		newEmployee.password = password ? await bcrypt.hash(password, 10) : "";
		newEmployee.role = role;
		const newAddress = new Address();
		newAddress.line1 = address.line1;
		newAddress.pincode = address.pincode;

		newEmployee.address = newAddress;
		return this.employeeRepository.save(newEmployee);
	}

	async updateEmployee(id: number, detailsToUpdate: Partial<Employee>) {
		const employee = await this.employeeRepository.findOneBy({ id });
		employee.name = detailsToUpdate.name;
		employee.email = detailsToUpdate.email;
		employee.age = detailsToUpdate.age;
		employee.address.line1 = detailsToUpdate.address?.line1;
		employee.address.pincode = detailsToUpdate.address?.pincode;
		return this.employeeRepository.save(employee);
	}

	async deleteEmployee(id: number) {
		const employee = await this.employeeRepository.findOneBy({ id });
		return await this.employeeRepository.remove(employee);
	}

	async loginEmployee(email: string, password: string) {
		try {
			const employee = await this.employeeRepository.findOneBy({ email });

			if (!employee) {
				throw new Error();
			}
			const result = await bcrypt.compare(password, employee.password);
			if (!result) {
				throw new Error();
			}

			const payload: jwtPayLoad = {
				name: employee.name,
				email: employee.email,
				role: employee.role,
			};
			const token = jsonwebtoken.sign(payload, JWT_TOKEN, {
				expiresIn: JWT_VALIDITY,
			});

			return { token };
		} catch (error) {}
	}
}

export default EmployeeService;
