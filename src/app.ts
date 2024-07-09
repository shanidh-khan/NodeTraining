import { Request, Response } from "express";
import loggerMiddleware from "./middleware/logger.middleware";
import bodyParser from "body-parser";
import dataSource from "./db/data-source.db";
import employeeRouter from "./routes/employee.routes";
import { error } from "console";
import HttpException from "./exceptions/http.exceptions";
import dotenv from "dotenv";
import departmentRouter from "./routes/department.routes";
import errorMiddleware from "./middleware/error.middleware";
dotenv.config();

const express = require("express");
const server = new express();

server.use(bodyParser.json());
server.use(loggerMiddleware);
server.use("/employees", employeeRouter);
server.use("/department", departmentRouter);

server.use(errorMiddleware);
(async () => {
	try {
		await dataSource.initialize();
	} catch (e) {
		console.log("Failed", e);
		process.exit(1);
	}
	server.listen(3000, () => {
		console.log("Server running on 3000");
	});
})();
