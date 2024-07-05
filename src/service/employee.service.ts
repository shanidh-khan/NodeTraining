import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";

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
		address: Address
	) {
		const newEmployee = new Employee();
		newEmployee.email = email;
		newEmployee.name = name;
		newEmployee.age = age;
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
}

export default EmployeeService;
