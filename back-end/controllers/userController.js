const {User} = require('../models/user');
const BadRequestError  = require('../errors/bad-req-error');
const {validateUser} = require('../models/user');
const createID = require('../services/createID');
const cuurentUser = require('../routes/currentUser');
const NotFoundError = require('../errors/not-found-error');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

exports.signup = async (req, res) => {

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');
    
    user = new User({
        name: req.body.name,
        email: req.body.email,
        subscription_plan: "free",
        subscription_status: 'pending',
        subscription_date: Date.now(),
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

    // const { currentUser } = req;
    // const {email } = currentUser ;
    // const user = await User.findOne({email});
    // if (!user)
    //     return new NotFoundError();

    // const updates = Object.keys(req.body);
    // const allowedUpdates = ['name', 'password'];
    // const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    // if (!isValidOperation) 
    // {
    //         throw new BadRequestError('Invalid updates! Not allowed to update this field');
    // }

    // updates.forEach((update) => user[update] = req.body[update]);

    // await user.save();
    // const userJwt = jwt.sign(
    //     {
    //         ID: req.body.ID,
    //         name: req.body.name,
    //         email: req.body.email,
    //         role: req.role
    //     }, 'JWT-Private'
    // );

    // req.session = {
    //     jwt: userJwt
    // };
    // req.body.role = req.role

    res.status(501).send({message: 'Not implemented'});
    // res.status(200).send(_.pick(user, ['ID','name','email', 'role']));
    

    
}



exports.delete = async (req, res) => {
    const { currentUser } = req;
    await currentUser.remove();
    res.send({ message: 'User deleted successfully!' });
}



