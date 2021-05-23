//DIPEMDENZE
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, validate} = require('../models/user');
const Joi = require('joi');
const config = require('config');
const path = require('path');
//ROUTER
const router = express.Router();
//LOGIN
router.post('/', async (req, res) => {
    
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Invalid email or password');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.cookie('x-auth-token', token).sendFile('main.html', { root: path.join(__dirname, '../public') });
});
module.exports = router;