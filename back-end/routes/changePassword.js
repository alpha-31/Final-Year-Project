const _ = require('lodash');
const express = require('express');
const router = express.Router();
const joi = require('joi');
const PasswordHandler = require('../services/passwordHandler');
const validateRequest = require('../middlewares/validate-req');
const unauthorized_req = require('../errors/unauthorized-req');
const verification = require('../middlewares/verification');
const currentUser = require('../middlewares/current-user');
const authenticate = require('../middlewares/authenticate');


router.post('/',validateRequest(reqValidation) ,async (req, res) => {
    
    const {email, oldPassword, newPassword} = req.body;
    
    const checkUser = await req.model.findOne({email});
    if(!checkUser){
        throw new unauthorized_req('Invalid User Email');
    }

    const passMatch = await PasswordHandler.compare(checkUser.password, oldPassword);
    if(!passMatch){
        throw new unauthorized_req('Wrong Password');
    }

    checkUser.password = newPassword;
    await checkUser.save();

    res.status(200).send('Successfull');
});

router.post('/resetPassword', [currentUser, authenticate, verification(['Admin'])] ,async (req, res) => {
    const {email, newPassword} = req.body;
    const checkUser = await req.model.findOne({email});
    if(!checkUser){
        throw new unauthorized_req('Invalid User Email');
    }

    checkUser.password = newPassword;
    await checkUser.save();

    res.status(200).send({message:'Successfull'});
});


function reqValidation(req) {
    const schema = joi.object({
        email: joi.required(),
        oldPassword: joi.required(),
        newPassword: joi.required()
    });
    return schema.validate(req,{abortEarly: false});
}

module.exports = router;