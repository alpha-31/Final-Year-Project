const CustomError = require('./customError');

class DatabaseConnectionError extends CustomError {
    
    statusCode = 500;
    reason = 'Error connecting to database';

    constructor() {
        super();
    }

    serializeErrors() {
        return [
            { message: this.reason }
        ];
    }
}

module.exports = DatabaseConnectionError;