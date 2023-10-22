const HttpError = (status, msg) => {
	const error = new Error(msg);
	error.status = status;
	return error;
}

module.exports = HttpError;