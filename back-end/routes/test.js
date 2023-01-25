//testing password handling service without chai and mocha

const PasswordHandler = require('../services/passwordHandler');
const express = require('express');
const router = express.Router();

mypass = "12345678";

router.post('/', async (req , res) => {
   
    
    //send res to client with hashed password and result
    res.send(result);

});

module.exports = router 





