const _ = require('lodash');
const express = require('express');
const router = express.Router();
const BadRequestError = require('../errors/bad-req-error');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const PasswordHandler = require('../services/passwordHandler');
const validateRequest = require('../middlewares/validate-req');
const unauthorized_req = require('../errors/unauthorized-req');


router.post('/signin',validateRequest(reqValidation) ,async (req, res) => {
    
    const {email, password} = req.body;
    
    const checkUser = await req.model.findOne({email});
    
    if(!checkUser){
        throw new unauthorized_req('Invalid User email');
    }    

    const passMatch = await PasswordHandler.compare(checkUser.password, password);
    if(!passMatch){
        throw new unauthorized_req('Wrong Password ' );
    }

    const userJwt = jwt.sign(
        {
            ID: checkUser.ID,
            db_id : checkUser._id,
            name: checkUser.name,
            email: checkUser.email,
            role: req.role
        }, 'JWT-Private'
    );

    req.session = {
        jwt: userJwt
    };
    checkUser.role = req.role

    res.status(200).send(_.pick(checkUser, ['ID','name','email', 'role']));
});


function reqValidation(req) {
    const schema = joi.object({
        email: joi.required(),
        password: joi.required()
    });
    return schema.validate(req,{abortEarly: false});
}

module.exports = router;