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
const {signup, viewInfo, updateInfo , subscribe } = require('../controllers/userController');
const {uploadVideo , analyzeVideo , getAllVideos , deleteVideo } = require('../controllers/videoController');
const uploadService = require('../services/uploadVideo');





router.use(currentUser)
router.post('/signup', signup);
router.post('/signin',setRequest(User , 'User') , signIn);
router.use(authenticate)
router.use('/changePassword', [authenticate ,setRequest(User, 'User')], changePassword);
router.use('/resetPassword', [reset, setRequest(User, 'User')], changePassword);
router.get('/viewInfo', authenticate, viewInfo);
router.put('/updateInfo/:id',validateRequest(reqValidationUpdate), authenticate, updateInfo);

router.post('/upload', [currentUser , uploadService.single('video') ] , uploadVideo);
router.post('/analyze/:id', [currentUser], analyzeVideo);
router.get('/getAllVideos', [currentUser], getAllVideos);
router.delete('/delete/:id', [currentUser], deleteVideo);

router.post('/subscribe/:id', [currentUser], subscribe)


function reqValidationUpdate(req) {
    const schema = joi.object({
        name: joi.required(),
        password: joi.optional()
    });
    return schema.validate(req,{abortEarly: false});
}

module.exports = router;
