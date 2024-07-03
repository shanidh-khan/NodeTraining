import { Request, Response } from "express";
import employeeRouter from "./employeeRouter";
import loggerMiddleware from "./loggerMiddleware";
import bodyParser from "body-parser";
import dataSource from "./data-source";

const express = require("express");
const server = new express();

server.use(bodyParser.json());
server.use(loggerMiddleware);
server.use("/employees", employeeRouter);
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
