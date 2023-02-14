const {User} = require('../models/user');
const {UserRequest , validateUserRequest} = require('../models/userRequest');
const BadRequestError  = require('../errors/bad-req-error');
const {validateUser} = require('../models/user');
const createID = require('../services/createID');
const cuurentUser = require('../routes/currentUser');
const { SubscriptionPlan } = require('../models/subscriptionPlan');
const NotFoundError = require('../errors/not-found-error');
const jwt = require('jsonwebtoken');
const sendEmail = require('../services/sendMail');
const _ = require('lodash');

exports.signup = async (req, res) => {

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');
    
    user = new User({
        name: req.body.name,
        email: req.body.email,
    });
    user.password = req.body.password;
    user.ID = await createID("User");
    await user.save();

    res.send({ message: 'User registered successfully!' });
}

exports.signout = async (req, res) => {
    req.session.jwt = null;
    res.send({ message: 'Successfully signed out' });
}

exports.viewInfo = async (req, res) => {
    const { currentUser } = req;
   res.status(200).send(_.pick(currentUser, ['ID','name','email', 'role']));
}

exports.updateInfo =  async (req, res) => {
    // update user info
    const user  = await User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true});
    if (!user)
    {
        return new NotFoundError();
    }

    res.status(200).send(_.pick(user, ['ID', 'name','email']));
}

exports.subscribe = async (req, res) => {
    
    const { currentUser } = req;
    const {db_id} = currentUser ;
    const subs_id = req.params.id ;

    const subscription_plan =  await SubscriptionPlan.findById(subs_id);
    const user = await User.findById(db_id);
     
    if (!user)
    {
        return new NotFoundError();
    }
    if (!subscription_plan)
    {
        return new NotFoundError();
    }
    const request = await UserRequest.findOne(
        {$and :[ {user_id: db_id , plan_id: subs_id, status: {$eq: 'pending'} } ]}    
    ); 

    if (request)
    {
        return res.status(400).send({message: 'Request already exists', data: request});
    }
    //create a new user request
    const userRequest = new UserRequest({
        user_id: user._id,
        plan_id: subs_id,
    });
    // console.log(userRequest);
    await userRequest.save();
    // send email to user
    const subject = 'Subscription Request';
    // create a dynamic body with the user name and the subscription plan name 
    const body = `Dear ${user.name}, \n Your request for subscription plan which is ${subscription_plan.name} has been sent successfully to the Admin. \n You will be notified once your request is approved. \n Thank you`;
    await sendEmail(user.email, subject, body);


    res.status(201).send({message: 'User Request Sent successfully'});

}



