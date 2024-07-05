import HttpException from "./http.exceptions";

class EntityNotFoundException extends HttpException {
	constructor(error) {
		super(404, error.MESSAGE);
	}
}

export default EntityNotFoundException;
