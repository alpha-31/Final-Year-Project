const BadRequestError = require('../errors/bad-req-error');

const verification = (allowed) => {
    return (req, res, next) => {
        // console.log(req.currentUser.role);
        if (!allowed.includes(req.currentUser.role)){
            
            throw new BadRequestError('Not authorized');
        }
        next();
    }
};

module.exports = verification;