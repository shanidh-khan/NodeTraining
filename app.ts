const express = require("express");
import { Request, Response } from "express";

const server = new express();

server.get("/", (req: Request, res: Response) => {
	console.log(req.url);
	res.status(200).send("Hello World");
});
server.get("/employee", (req: Request, res: Response) => {
	console.log(req.url);
	res.status(200).send("My Name is Shanidh Khan");
});
