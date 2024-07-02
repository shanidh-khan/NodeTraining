const express = require("express");
const server = new express();
server.get("/", (req, res) => {
	console.log(req.url);
	res.status(200).send("Hello World");
});
server.listen(3000, () => {
	console.log("Server is running on port 3000");
});
