const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
	const { id } = req.params;
	if (!isValidObjectId(id)) {
		const error = new Error(`${id} is not a valid`);
		error.status = 400;
		return next(error)
	}

	next();
}

module.exports = isValidId;