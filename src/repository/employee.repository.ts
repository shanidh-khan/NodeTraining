import { Repository } from "typeorm";
import Employee from "../entity/employee.entity";

class EmployeeRepository {
	constructor(private repository: Repository<Employee>) {}

	async find() {
		const employeeRepository = this.repository;
		return employeeRepository.find();
	}

	async findOneBy(filter: Partial<Employee>): Promise<Employee> {
		const employeeRepository = this.repository;
		return employeeRepository.findOne({
			where: filter,
			relations: ["address"],
		});
	}

	async save(newEmployee: Employee) {
		const employeeRepository = this.repository;
		return employeeRepository.save(newEmployee);
	}

	async delete(employee: Employee) {
		const employeeRepository = this.repository;

		return await employeeRepository.softRemove(employee);
	}
}

export default EmployeeRepository;
