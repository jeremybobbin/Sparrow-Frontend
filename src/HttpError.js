module.exports = class HttpError extends Error {
	constructor(httpErrorCode, userMessage, devMessage) {
		super(devMessage || userMessage);
		
		this.code = httpErrorCode;
		this.userMessage = userMessage;
		this.stack = new Error().stack();
	}
}