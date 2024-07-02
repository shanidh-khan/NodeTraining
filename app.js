const express = require("express");
const server = new express();
server.get("/", (req, res) => {
	console.log(req.url);
	res.status(200).send("Hello World");
});
server.get("/employee", (req, res) => {
	console.log(req.url);
	res.status(200).send("My Name is Shanidh Khan");
});
server.get("/getData", (req, res) => {
	let data = {
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
