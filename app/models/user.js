const Joi = require('joi');
const mongoose = require('mongoose');
const passwordComplexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken');
const config = require('config');
const {eventSchema} = require('./event');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength:5,
        maxlength: 50,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },
    events: [{
        type: eventSchema
    }]
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id : this._id}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {

    const schema = Joi.object({
        username: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: passwordComplexity().required()
    });

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;