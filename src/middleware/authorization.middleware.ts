import { NextFunction, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { JWT_TOKEN } from "../utils/constants";
import { RequestWithUser } from "../utils/requestWithUser";
import { jwtPayLoad } from "../utils/jwtPayload";

const authorize = async (
	req: RequestWithUser,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = getTokenFromRequestHeader(req);
		console.log("token: ", token);
		const payload = jsonwebtoken.verify(token, JWT_TOKEN);

		req.name = (payload as jwtPayLoad).name;
		req.email = (payload as jwtPayLoad).email;
		req.role = (payload as jwtPayLoad).role;

		return next();
	} catch (error) {
		return next(error);
	}
};

const getTokenFromRequestHeader = (req: RequestWithUser) => {
	const bearerToken = req.header("Authorization");
	console.log("bearerToken: ", bearerToken);
	const token = bearerToken ? bearerToken.replace("Bearer ", "") : "";
	return token;
};

export default authorize;
