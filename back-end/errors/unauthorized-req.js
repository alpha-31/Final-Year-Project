const CustomError = require('./customError');

class unauthorized_req extends CustomError {

    statusCode = 403;
    reason = ''

    constructor(message) {
        super();
        this.reason = message
    }

    serializeErrors() {
        return [{ message : this.reason }];
    }
}

module.exports = unauthorized_req;