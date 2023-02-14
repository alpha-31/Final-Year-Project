const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/bad-req-error');
const unauthorized_req = require('../errors/unauthorized-req');

function currentUser (req, res, next) {
  
    // console.log('currentUser');
    if (!req.session.jwt) {
      // console.log('No JWT')
        return next();
      }

    try {
        // console.log('req.session.jwt', req.session.jwt)
        const payload = jwt.verify(
          req.session.jwt,
          'JWT-Private'
        );
        // console.log('payload', payload)
        req.currentUser = payload;
      }
    catch (err) {
      console.log('err', err)
      throw new unauthorized_req('Need to login again')
    }
    next();
};

module.exports = currentUser;