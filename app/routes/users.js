//DIPENDENZE
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const {User, validate} = require('../models/user');
const Twitter_User = require('../models/twitter_user');
const auth = require('../middleware/auth');

//ROUTER
const router = express.Router();
//PROFILO (si potrebbe creare anche route a parte)
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if(!user){
        user = await Twitter_User.findById(req.twitter_user._id).select('-tokenSecret');
    }
    res.json(user);

});
//REGISTER
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email});
    if (user) return res.status(400).send('user already registered');
    
    user = await User.findOne({ username: req.body.username});
    if (user) return res.status(400).send('username already registered');
    
    user = new User(_.pick(req.body, ['username', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'username', 'email']));
});

module.exports = router;