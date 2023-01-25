
exports.signout = async (req, res) => {
    req.session.jwt = null;
    res.send({ result : req.session.jwt == null ,
        message: 'Successfully signed out' });
}
