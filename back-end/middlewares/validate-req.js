const RequestValidationError = require('../errors/req-validation-error');

const validateRequest = (validator) => {
    return (req, res, next) => {
        // console.log('validateRequest');
        const { value, error } = validator(req.body);

        if (error){
            throw new RequestValidationError(error.details);
        }
        next();
    }
};

module.exports = validateRequest;