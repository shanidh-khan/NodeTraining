import DepartmentRepository from "../repository/department.repository";
import Department from "../entity/department.entity";
import HttpException from "../exceptions/http.exceptions";

class DepartmentService {
	constructor(private departmentRepository: DepartmentRepository) {}

	async getAllDepartments() {
		return this.departmentRepository.find();
	}

	async getDepartmentById(id: number) {
		return this.departmentRepository.findOneBy(id);
	}

	async createDepartment(department: string) {
		const newDepartment = new Department();
		newDepartment.department = department;
		return this.departmentRepository.save(newDepartment);
	}

	async updateDepartment(id: number, detailsToUpdate: Partial<Department>) {
		const department = await this.departmentRepository.findOneBy(id);
		department.department = detailsToUpdate.department;

		return this.departmentRepository.save(department);
	}

	async deleteDepartment(id: number) {
		const department = await this.departmentRepository.findOneBy(id);
		if (department.employee.length) {
			throw new HttpException(
				403,
				"You can't delete department with employees in it."
			);
		}
		return await this.departmentRepository.remove(department);
	}
}

export default DepartmentService;
