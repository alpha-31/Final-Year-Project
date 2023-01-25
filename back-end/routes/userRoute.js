const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const reset = require('../middlewares/reset');
const currentUser = require('../middlewares/current-user');
const setRequest = require('../middlewares/setRequest')
const validateRequest = require('../middlewares/validate-req');
const signIn = require('../routes/signIn');
const joi = require('joi');
const {User} = require('../models/user');
const changePassword = require('../routes/changePassword');
const {signup, viewInfo, updateInfo  } = require('../controllers/userController');

router.use(currentUser)
router.post('/signup', signup);
router.post('/signin',setRequest(User , 'User') , signIn);
router.use('/changePassword', [authenticate ,setRequest(User, 'User')], changePassword);
router.use('/resetPassword', [reset, setRequest(User, 'User')], changePassword);
router.get('/viewInfo', authenticate, viewInfo);
router.put('/updateInfo/:id',validateRequest(reqValidationUpdate), authenticate, updateInfo);



function reqValidationUpdate(req) {
    const schema = joi.object({
        name: joi.required(),
        password: joi.optional()
    });
    return schema.validate(req,{abortEarly: false});
}

module.exports = router;
