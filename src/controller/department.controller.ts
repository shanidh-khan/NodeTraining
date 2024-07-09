import express from "express";
import HttpException from "../exceptions/http.exceptions";
import authorize from "../middleware/authorization.middleware";
import Role from "../utils/role.enum";
import DepartmentService from "../service/department.service";
import { RequestWithUser } from "../utils/requestWithUser";

class DepartmentController {
	public router: express.Router;

	constructor(private departmentService: DepartmentService) {
		this.router = express.Router();
		this.router.get("/", authorize, this.getAllDepartments);
		this.router.get("/:id", authorize, this.getDepartmentById);
		this.router.post("/", authorize, this.createDepartment);
		this.router.delete("/:id", authorize, this.deleteDepartment);
		this.router.put("/:id", authorize, this.updateDepartment);
	}
	public getAllDepartments = async (
		req: RequestWithUser,
		res: express.Response,
		next: express.NextFunction
	) => {
		try {
			const role = req.role;
			if (role != Role.HR) {
				throw new HttpException(403, "You are not authorized.");
			}
			const departments =
				await this.departmentService.getAllDepartments();
			if (!departments.length) {
				const error = new HttpException(404, `No Department found`);
				throw error;
			}
			res.status(200).send(departments);
		} catch (err) {
			next(err);
		}
	};

	public getDepartmentById = async (
		req: RequestWithUser,
		res: express.Response,
		next: express.NextFunction
	) => {
		try {
			const role = req.role;
			if (role != Role.HR) {
				throw new HttpException(403, "You are not authorized.");
			}
			const department = await this.departmentService.getDepartmentById(
				Number(req.params.id)
			);
			if (!department) {
				const error = new HttpException(
					404,
					`No Department found with id: ${req.params.id}`
				);
				throw error;
			}
			res.status(200).send(department);
		} catch (err) {
			next(err);
		}
	};

	public createDepartment = async (
		req: RequestWithUser,
		res: express.Response,
		next: express.NextFunction
	) => {
		try {
			const role = req.role;
			if (role != Role.HR) {
				throw new HttpException(403, "You are not authorized.");
			}
			const department = await this.departmentService.createDepartment(
				req.body.department
			);
			res.status(201).send(department);
		} catch (error) {
			next(error);
		}
	};

	public deleteDepartment = async (
		req: RequestWithUser,
		res: express.Response,
		next: express.NextFunction
	) => {
		try {
			const role = req.role;
			if (role != Role.HR) {
				throw new HttpException(403, "You are not authorized.");
			}
			const result = await this.departmentService.deleteDepartment(
				Number(req.params.id)
			);

			console.log(result);
			res.status(204).send();
		} catch (err) {
			next(err);
		}
	};

	public updateDepartment = async (
		req: RequestWithUser,
		res: express.Response,
		next: express.NextFunction
	) => {

		try {
			const role = req.role;
		if (role != Role.HR) {
			throw new HttpException(403, "You are not authorized.");
		}
		const department = await this.departmentService.updateDepartment(
			Number(req.params.id),
			req.body
		);
		res.status(200).send(department);
		} catch (error) {
			next(error);

		}
		
	};
}

export default DepartmentController;
