const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const {eventSchema} = require('./event');

const userSchema = new mongoose.Schema({
    twitterId: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,
        required: true
    },
    tokenSecret: {
        type: String,
        required: true
    },
    events: [{
        type: eventSchema
    }]

});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id : this._id}, config.get('jwtPrivateKey'));
    return token;
}

const Twitter_User = mongoose.model('Twitter_User', userSchema);

module.exports = Twitter_User;