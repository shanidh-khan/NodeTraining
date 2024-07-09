import { Repository } from "typeorm";
import Department from "../entity/department.entity";

class DepartmentRepository {
	constructor(private repository: Repository<Department>) {}

	async find() {
		const departmentRepository = this.repository;
		return departmentRepository.find({
			relations: ["employee"],
		});
	}

	async findOneBy(id: number) {
		const departmentRepository = this.repository;
		return departmentRepository.findOne({
			where: { id },
			relations: ["employee"],
		});
	}

	async findOne(department: Partial<Department>) {
		const departmentRepository = this.repository;
		return departmentRepository.findOne({ where: department });
	}

	async save(newDepartment: Department) {
		const departmentRepository = this.repository;
		return departmentRepository.save(newDepartment);
	}

	async delete(newDepartment: Department) {
		const departmentRepository = this.repository;

		return await departmentRepository.softDelete(newDepartment);
	}

	async remove(newDepartment: Department) {
		const departmentRepository = this.repository;

		return await departmentRepository.softRemove(newDepartment);
	}
}

export default DepartmentRepository;
