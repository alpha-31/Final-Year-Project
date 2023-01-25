const unauthorized_req = require('../errors/unauthorized-req');

function authenticate (req, res, next) {

    if(!req.currentUser){
        throw new unauthorized_req('User is not logged in')
    }
    next();
};

module.exports = authenticate;