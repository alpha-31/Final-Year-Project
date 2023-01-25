
function reset (req, res, next) {
    req.body.newPassword = 1234;
    next();
};
module.exports = reset;