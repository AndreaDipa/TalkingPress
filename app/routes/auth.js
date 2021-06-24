//DIPEMDENZE
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, validate, validateLogin } = require("../models/user");
const Joi = require("joi");
const config = require("config");
const path = require("path");
//ROUTER
const router = express.Router();
//LOGIN
/**
 * @api {post} /api/auth Login user
 * @apiName LoginUser
 * @apigroup Authorization
 * @apiBody {String} email user's email
 * @apiBody {String} password user's password
 * @apiSuccess {cookie} x-auth-token http only cookie with authorization token
 * 

 */
router.post("/", async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send("invalid email or password");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(401).send("invalid email or password");

    const token = user.generateAuthToken();
    res.cookie("x-auth-token", token, {httpOnly: true}).end();
});
module.exports = router;
