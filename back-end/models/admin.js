const mongoose = require('mongoose');
const PasswordHandler = require('../services/passwordHandler');

const adminSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

adminSchema.pre('save', async function(next) {
    const admin = this;
    if (admin.isModified('password')) {
        admin.password = await PasswordHandler.toHash(admin.password);
    }
    next();
});



exports.Admin = mongoose.model('Admin', adminSchema);
