const express = require('express');
const {Admin} = require('../models/admin');
const { SubscriptionPlan , ValidateSubscriptionPlan} = require('../models/subscriptionPlan');
const { createPlan, updatePlan, deletePlan, getPlans , getPlan} = require('../controllers/subscriptionController');
const setRequest = require('../middlewares/setRequest');
const reset = require('../middlewares/reset');
const authenticate = require('../middlewares/authenticate');
const validateReq = require('../middlewares/validate-req');
const verification = require('../middlewares/verification');
const setRequestType = require('../middlewares/setRequestType');
const signIn = require('../routes/signIn');
const joi = require('joi');
const changePassword = require('../routes/changePassword');
const currentUser = require('../routes/currentUser');
const {UserRequest , validateUserRequest} = require('../models/userRequest');
const {approveRequest ,getAllUserRequests , getUserRequest , getAllRequestsByType , rejectRequest ,  } = require('../controllers/adminUserController');

const router = express.Router();

router.use(currentUser);
router.post('/signin',setRequest(Admin , 'Admin') , signIn);
// router.use(authenticate);
router.use('/change', [reset, setRequest(Admin, 'Admin'), verification(['Admin'])], changePassword);

//manage subscription plans
router.post('/createPlan',[currentUser, setRequest(Admin, 'Admin'),validateReq(ValidateSubscriptionPlan) ]  , createPlan);
router.put('/updatePlan/:id',validateReq(SubscriptionPlanUpdateValidator), updatePlan);
router.delete('/deletePlan/:id', deletePlan);
router.get('/getPlans', getPlans);
router.get('/getPlan/:id', getPlan);

//manage user requests
router.get('/getAllUserRequests',[currentUser, setRequest(Admin, 'Admin')], getAllUserRequests);
router.get('/getRequest/:id',[currentUser, setRequest(Admin, 'Admin')], getUserRequest);
router.post('/approveRequest/:id',[currentUser, setRequest(Admin, 'Admin')], approveRequest);
router.post('/rejectRequest/:id',[currentUser, setRequest(Admin, 'Admin')], rejectRequest);
router.get('/getAllApprovedRequests',[currentUser, setRequestType('accepted')], getAllRequestsByType);
router.get('/getAllRejectedRequests',[currentUser, setRequestType('rejected')], getAllRequestsByType);
router.get('/getAllPendingRequests',[currentUser, setRequestType('pending')], getAllRequestsByType);


// manage users accounts
// router.put('/updateUser/:id', [currentUser, setRequest(Admin, 'Admin')], updateUser);
// router.delete('/deleteUser/:id',[currentUser, setRequest(Admin, 'Admin')], deleteUser);
// router.get('/getAllUsers',[currentUser, setRequest(Admin, 'Admin')], getUsers);
// router.get('/getUser/:id',[currentUser, setRequest(Admin, 'Admin')], getUser);



function SubscriptionPlanUpdateValidator(req) {
    const schema = joi.object({
        desc: joi.string().optional(),
        price: joi.number().optional(),
        features : joi.array().optional(),
        spec : joi.object({
            size : joi.number().optional(),
            time : joi.number().optional()
          }).optional(),
        subscription_type: joi.string().valid('size', 'time').optional(),
        status : joi.string().valid('active', 'inactive').optional()

    });
    return schema.validate(req,{abortEarly: false});
}

module.exports = router;


