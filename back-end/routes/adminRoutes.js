const express = require('express');
// import from subscriptionController.js
const {Admin} = require('../models/admin');
const { SubscriptionPlan , ValidateSubscriptionPlan} = require('../models/subscriptionPlan');
const { createPlan, updatePlan, deletePlan, getPlans , getPlan} = require('../controllers/subscriptionController');
const setRequest = require('../middlewares/setRequest');
const reset = require('../middlewares/reset');
const authenticate = require('../middlewares/authenticate');
const validateReq = require('../middlewares/validate-req');
const verification = require('../middlewares/verification');
const signIn = require('../routes/signIn');
const joi = require('joi');
const changePassword = require('../routes/changePassword');
const currentUser = require('../routes/currentUser');
const router = express.Router();

// router.use(currentUser);
// manage user accounts
router.post('/signin',setRequest(Admin , 'Admin') , signIn);
router.use('/change', [reset, setRequest(Admin, 'Admin'), verification(['Admin'])], changePassword);

//manage subscription plans
router.post('/createPlan',[currentUser, setRequest(Admin, 'Admin'),validateReq(ValidateSubscriptionPlan) ]  , createPlan);
router.put('/updatePlan/:id',validateReq(SubscriptionPlanUpdateValidator), updatePlan);
router.delete('/deletePlan/:id', deletePlan);
router.get('/getPlans', getPlans);
router.get('/getPlan/:id', getPlan);


function SubscriptionPlanUpdateValidator(req) {
    const schema = joi.object({
        desc: joi.string().optional(),
        price: joi.number().optional(),
        features : joi.array().optional(),
        subscription_type: joi.string().valid('size', 'time').optional(),
        status : joi.string().valid('active', 'inactive').optional()

    });
    return schema.validate(req,{abortEarly: false});
}

module.exports = router;


