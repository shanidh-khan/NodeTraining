import HttpException from "./http.exceptions";

class IncorrectPasswordException extends HttpException {
	constructor(error) {
		super(401, error.MESSAGE);
	}
}

export default IncorrectPasswordException;
