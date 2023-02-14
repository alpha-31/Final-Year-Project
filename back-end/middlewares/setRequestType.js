
const setRequestType = (type) => {
    return (req, res, next) => {
        // console.log('setRequest');
        req.reqType = type
        next();
    }
};

module.exports = setRequestType;