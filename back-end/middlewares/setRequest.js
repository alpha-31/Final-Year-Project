
const setRequest = (model, role) => {
    return (req, res, next) => {
        // console.log('setRequest');
        req.model = model
        req.role = role
        // console.log('req.model', req.model);
        next();
    }
};

module.exports = setRequest;