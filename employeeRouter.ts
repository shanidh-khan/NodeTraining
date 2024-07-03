import express from "express";
import { Request, Response } from "express";
import Employee from "./employees";
import dataSource from "./data-source";

const employeeRouter = express.Router();

employeeRouter.get("/", async (req: Request, res: Response) => {
	console.log(req.url);
	const employeeRepository = dataSource.getRepository(Employee);
	const employees = await employeeRepository.find();
	res.status(200).send(employees);
});

employeeRouter.get("/:id", async (req: Request, res: Response) => {
	console.log(req.url);
	const employeeRepository = dataSource.getRepository(Employee);
	const employees = await employeeRepository.findOneBy({
		id: Number(req.params.id),
	});

	res.status(200).send(employees);
});

employeeRouter.post("/", async (req: Request, res: Response) => {
	console.log(req.url);
	console.log(req.body);
	const employeeRepository = dataSource.getRepository(Employee);
	const newEmployee = new Employee();
	newEmployee.email = req.body.email;
	newEmployee.name = req.body.name;
	const savedEmployee = await employeeRepository.save(newEmployee);
	res.status(201).send("Created an employee");
});

employeeRouter.put("/:id", async (req: Request, res: Response) => {
	console.log(req.url);
	const employeeRepository = dataSource.getRepository(Employee);
	const employee = await employeeRepository.findOneBy({
		id: Number(req.params.id),
	});
	employee.name = req.body.name;
	employee.email = req.body.email;
	const savedEmployee = await employeeRepository.save(employee);
	res.status(200).send("Updated an employee");
});

employeeRouter.delete("/:id", async (req: Request, res: Response) => {
	console.log(req.url);

	const employeeRepository = dataSource.getRepository(Employee);
	const result = await employeeRepository.softDelete({
		id: Number(req.params.id),
	});

	res.status(204).send("Deleted an employee");
});
employeeRouter.delete("/employees", (req: Request, res: Response) => {
	console.log(req.url);
	res.status(204).send("Deleted all employee");
});

export default employeeRouter;
