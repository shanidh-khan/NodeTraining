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

interface Profile {
	name: string;
	age: number;
}
interface Data {
	profile: Profile;
}
server.get("/getData", (req: Request, res: Response) => {
	let data: Data = {
		profile: {
			name: "Shanidh",
			age: 23,
		},
	};
	console.log(data.profile.name);
	res.status(200).send(data);
});
server.listen(3000, () => {
	console.log("Server is running on port 3000");
});
