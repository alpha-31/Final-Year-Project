const CustomError = require('./customError');

class NotFoundError extends CustomError {
    
    statusCode = 404;
    reason = 'Not Found';

    constructor() {
        super();
    }

    serializeErrors() {
        return [
            { message: this.reason }
        ];
    }
}

module.exports = NotFoundError;