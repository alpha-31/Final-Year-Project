const CustomError = require('../errors/customError');

function errorHandler (err, req, res, next) {

    if(err instanceof CustomError){
        return res.status(err.statusCode).send({errors: err.serializeErrors()})
    }

    res.status(400).send(err.message);
};

module.exports = errorHandler;