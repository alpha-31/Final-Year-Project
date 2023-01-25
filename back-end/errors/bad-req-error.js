const CustomError = require('./customError');

class BadRequestError extends CustomError {

    statusCode = 401;
    reason = ''

    constructor(message) {
        super();
        this.reason = message
    }

    serializeErrors() {
        return [{ message : this.reason }];
    }
}

module.exports = BadRequestError;