const {UserRequest , validateUserRequest} = require('../models/userRequest');  
const  {User} = require('../models/user');
const {SubscriptionPlan} = require('../models/subscriptionPlan');
const sendEmail = require('../services/sendMail');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-req-error');


exports.approveRequest = async (req, res) => {

    //approve request
    const request = await UserRequest.findById(req.params.id);
    if (!request) {
        throw new NotFoundError();
    }
    if(request.request_status == "accepted")
    {
        throw new BadRequestError("Request already accepted");
    }
    
    request.request_status = "accepted";
    const user = await User.findById(request.user_id);
    const plan = await SubscriptionPlan.findById(request.plan_id);
    user.subscription_status = "active";
    user.subscription_plan = plan;
    type =plan.subscription_type ;
    user.subscription_type = type;
    if(type == "size")
    {
        user.plan_left_size += plan.spec[plan.subscription_type]; 
    }
    else if(type == "time")
    {
        user.plan_left_time += plan.spec[plan.subscription_type];
    }    
    // plan.subscribers.push(user);
    await request.save();
    await user.save();
    res.status(200).send({message: 'Request approved successfully', 
        user : user});
    const subject = 'Approval Request';
    // creating a dynamic body with the user name and the subscription plan name 
    const body = `Dear ${user.name}, \n Your request for subscription plan which is ${plan.name} has been approved successfully to the Admin. \n You are being notified about this. \n Thank you`;
    await sendEmail(user.email, subject, body);


}


exports.getAllUserRequests = async (req, res) => {
    const requests = await UserRequest.find();
    res.send(requests);
}

exports.getUserRequest = async (req, res) => {
    
    const request = await UserRequest.findById(req.params.id);
    if (!request) {
        throw new NotFoundError();
    }
    res.send(request);
}

exports.getAllRequestsByType = async (req, res) => {
    const requests = await UserRequest.find({request_status : req.reqType});
    res.status(200).send(requests);
}

exports.rejectRequest = async (req, res) => {
    const request = await UserRequest.findById(req.params.id);
    if (!request) {
        throw new NotFoundError();
    }
    if(request.request_status == "rejected")
    {
        throw new BadRequestError("Request already rejected");
    }
    const user = await User.findById(request.user_id);
    const plan = await SubscriptionPlan.findById(request.plan_id);
    request.request_status = "rejected";
    await request.save();
    const subject = 'Rejection of Request';
    // creating a dynamic body with the user name and the subscription plan name 
    const body = `Dear ${user.name}, \n Your request for subscription plan which is ${plan.name} has been rejected due to some reasons. \n You are being notified about this. \n Thank you`;
    await sendEmail(user.email, subject, body);

    res.status(200).send({message: 'Request rejected successfully'});

}




