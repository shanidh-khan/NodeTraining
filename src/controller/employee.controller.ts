import express from "express";
import EmployeeService from "../service/employee.service";
import HttpException from "../exceptions/http.exceptions";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/employee.dto";
import { validate } from "class-validator";

class EmployeeController {
	public router: express.Router;

	constructor(private employeeService: EmployeeService) {
		this.router = express.Router();
		this.router.get("/", this.getAllEmployees);
		this.router.get("/:id", this.getEmployeeById);
		this.router.post("/", this.createEmployee);
		this.router.delete("/:id", this.deleteEmployee);
		this.router.put("/:id", this.updateEmployee);
	}
	public getAllEmployees = async (
		req: express.Request,
		res: express.Response
	) => {
		const employees = await this.employeeService.getAllEmployees();
		res.status(200).send(employees);
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
				employeeDto.address
			);
			res.status(201).send(employee);
		} catch (error) {
			next(error);
		}
	};

	public deleteEmployee = async (
		req: express.Request,
		res: express.Response
	) => {
		const result = await this.employeeService.deleteEmployee(
			Number(req.params.id)
		);
		console.log(result);
		res.status(204).send();
	};

	public updateEmployee = async (
		req: express.Request,
		res: express.Response
	) => {
		const employee = await this.employeeService.updateEmployee(
			Number(req.params.id),
			req.body
		);
		res.status(200).send(employee);
	};
}

export default EmployeeController;
