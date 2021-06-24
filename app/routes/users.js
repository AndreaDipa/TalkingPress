//DIPENDENZE
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");
const Twitter_User = require("../models/twitter_user");
const auth = require("../middleware/auth");

//ROUTER
const router = express.Router();
/**
 * @api {get} /api/users/username Request current user's username
 * @apiName GetUsername
 * @apigroup Users
 * 
 * @apiSuccess {String} username current user's username
 */
router.get("/username", auth, async (req, res) => {
    let user = await User.findById(req.user._id).select("-password");
    if (!user) {
        user = await Twitter_User.findById(req.user._id)
            .select("-tokenSecret")
            .select("-token");
    }
    res.send(user.username);
});
/**
 * @api {get} /api/users/me Request current user's profile
 * @apiName GetProfile
 * @apigroup Users
 * 
 * @apiSuccess {json} user current user's profile
 */
router.get("/me", auth, async (req, res) => {
    let user = await User.findById(req.user._id).select("-password");
    if (!user) {
        user = await Twitter_User.findById(req.user._id)
            .select("-tokenSecret")
            .select("-token");
    }
    res.json(user);
});
//REGISTER
/**
 * @api {post} /api/users Register user
 * @apiName RegisterUser
 * @apigroup Users
 * @apiBody {String} username user's username
 * @apiBody {String} email user's email
 * @apiBody {String} password user's password
 * @apiSuccess {cookie} x-auth-token http only cookie with authorization token
 */
router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send("username already exists");

    user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("email already exists");

    user = new User(_.pick(req.body, ["username", "email", "password"]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.cookie("x-auth-token", token, {httpOnly: true}).end();
});

module.exports = router;
