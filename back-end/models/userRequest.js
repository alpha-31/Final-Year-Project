const mongoose = require('mongoose');

// model to handle the requests of the users
const userRequestSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    plan_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subscriptionplans',
        required: true
    },
    request_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    request_status: {
        type: String,
        required: true,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
});

//make a validate function schema and exports it to use in other files
function validateUserRequest (request) {
    // const schema = joi.object({
    //     user_id: joi.string().required(),
    //     plan_id: joi.string().required(),
    // });
    // return schema.validate(request,{abortEarly: false});
};

const Request = mongoose.model('UserRequest', userRequestSchema);
exports.UserRequest = Request;
exports.validateUserRequest = validateUserRequest;
