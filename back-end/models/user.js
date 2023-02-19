const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const PasswordHandler = require('../services/passwordHandler');

const userSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
        unique: true,
        maxLength: 9,
        minLength: 9,
        pattern: "^[A-Za-z0-9]{3}-[A-Za-z0-9]{5}$"   
    },
    name: {
        type: String,
        required: true,
        pattern: "^[ A-Za-z]*$",
    },
    email: {
        type: String,
        required: true,
        unique: true,
        pattern: "[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]"
    },
    password: {
        type: String,
        required: true,
        default: "siba@1234"
    },
    subscription_plan: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'subscription_plans'
    },
    plan_left_size: {
        type: Number,
        required: true,
        default: 0
    },
    plan_left_time: {
        type: Number,
        required: true,
        default: 0
    },
    subscription_status: {
        type: String,
        required: true,
        enum: ['pending', 'active', 'expired'],
        default: 'pending'
    },
    joiningDate: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await PasswordHandler.toHash(user.password);
    }
    next();
});

//make a validate function schema and exports it to use in other files
function validateUser (user) {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
        plan_left_size: joi.number().required(),
        plan_left_time: joi.number().required(),
        subscription_plan: joi.string().optional(),
        subscription_status: joi.string().required(),
        joiningDate: joi.date().required() 
    });
    return schema.validate(user,{abortEarly: false});
};

const secretKey = 'JWT-Private';

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, secretKey);
    return token;
}

const User = mongoose.model('users', userSchema);

exports.User = User 
exports.validateUser = validateUser;