import express from "express";
import EmployeeService from "../service/employee.service";
import HttpException from "../exceptions/http.exceptions";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/employee.dto";
import { validate } from "class-validator";
import authorize from "../middleware/authorization.middleware";
import Role from "../utils/role.enum";

class EmployeeController {
	public router: express.Router;

	constructor(private employeeService: EmployeeService) {
		this.router = express.Router();
		this.router.get("/", this.getAllEmployees);
		this.router.get("/:id", this.getEmployeeById);
		this.router.post("/", authorize, this.createEmployee);
		this.router.delete("/:id", this.deleteEmployee);
		this.router.put("/:id", this.updateEmployee);
		this.router.post("/login", this.loginEmployee);
	}
	public getAllEmployees = async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		try {
			const employees = await this.employeeService.getAllEmployees();
			if (!employees) {
				const error = new HttpException(404, `No Employees found`);
				throw error;
			}
			res.status(200).send(employees);
		} catch (err) {
			next(err);
		}
	};

	public getEmployeeById = async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		try {
			const employee = await this.employeeService.getEmployeeById(
				Number(req.params.id)
			);
			if (!employee) {
				const error = new HttpException(
					404,
					`No Employee found with id: ${req.params.id}`
				);
				throw error;
			}
			res.status(200).send(employee);
		} catch (err) {
			next(err);
		}
	};

	public createEmployee = async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		try {
			const role = req.body.role;
			if (role != Role.HR) {
				throw new HttpException(
					403,
					"You are not authorized to create employee"
				);
			}

			const employeeDto = plainToInstance(CreateEmployeeDto, req.body);
			const errors = await validate(employeeDto);
			if (errors.length) {
				console.log(errors);
				throw new HttpException(400, JSON.stringify(errors));
			}
			const employee = await this.employeeService.createEmployee(
				employeeDto.name,
				employeeDto.email,
				employeeDto.age,
				employeeDto.address,
				employeeDto.password,
				employeeDto.role
			);
			res.status(201).send(employee);
		} catch (error) {
			next(error);
		}
	};

	public deleteEmployee = async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		try {
			const result = await this.employeeService.deleteEmployee(
				Number(req.params.id)
			);

			console.log(result);
			res.status(204).send();
		} catch (err) {
			next(err);
		}
	};

	public updateEmployee = async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		const employee = await this.employeeService.updateEmployee(
			Number(req.params.id),
			req.body
		);
		res.status(200).send(employee);
	};

	public loginEmployee = async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		const { email, password } = req.body;
		try {
			const token = await this.employeeService.loginEmployee(
				email,
				password
			);
			res.status(200).send(token);
		} catch (error) {
			next(error);
		}
	};
}

export default EmployeeController;
