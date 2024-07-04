import { Request, Response } from "express";
import loggerMiddleware from "./middleware/logger.middleware";
import bodyParser from "body-parser";
import dataSource from "./db/data-source.db";
import employeeRouter from "./routes/employee.routes";
import { error } from "console";
import HttpException from "./exceptions/http.exceptions";

const express = require("express");
const server = new express();

server.use(bodyParser.json());
server.use(loggerMiddleware);
server.use("/employees", employeeRouter);

server.use((err: Error, req, res, next) => {
	console.error(err.stack);
	if (err instanceof HttpException) {
		res.status(err.status).send({ error: err.message });
	}
	res.status(500).send({ error: err.message });
});
server.get("/", (req: Request, res: Response) => {
	console.log(req.url);
	res.status(200).send("Hello World");
});

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
