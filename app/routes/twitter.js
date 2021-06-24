const express = require("express");
const router = express.Router();

const TwitterStrategy = require("passport-twitter").Strategy;
const passport = require("passport");
const Twitter_User = require("../models/twitter_user");
const { User } = require("../models/user");
const Twit = require("twit");
const CryptoJs = require("crypto-js");
const auth = require("../middleware/auth");
const config = require("config");
const path = require("path");

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(
    new TwitterStrategy(
        {
            consumerKey: config.get('cons_key'),
            consumerSecret: config.get('sec_key'),
            callbackURL: "/twitter/return",
        },
        async function (accessToken, refreshToken, profile, done) {
            let user = await Twitter_User.findOne({ twitterId: profile.id });
            if (user) return done(null, profile);

            user = new Twitter_User({
                twitterId: profile.id,
                username: profile.username,
                token: accessToken,
                tokenSecret: refreshToken,
            });

            user.token = CryptoJs.AES.encrypt(
                user.token,
                config.get('AES_secret')
            ).toString();
            user.tokenSecret = CryptoJs.AES.encrypt(
                user.tokenSecret,
                config.get('AES_secret')
            ).toString();

            await user.save();

            return done(null, profile);
        }
    )
);
/**
 * @api {get} /twitter/login Request login with twitter
 * @apiName LoginTwitter
 * @apigroup Twitter
 * 
 * @apiSuccess {cookie} x-auth-token http only cookie with authorization token
 */
router.get("/login", passport.authenticate("twitter"));

router.get(
    "/return",
    passport.authenticate("twitter", { failureRedirect: "/auth/error" }),
    async function (req, res) {
        const user = await Twitter_User.findOne({ twitterId: req.user.id });
        const token = user.generateAuthToken();

        res.cookie("x-auth-token", token, {httpOnly: true}).redirect(
            "/home.html"
        );
    }
);

/**
 * @api {get} /twitter/tweets/:topic Request tweets of the topic
 * @apiName GetTweets
 * @apigroup Twitter
 * 
 * @apiSuccess {[json]} tweets top tweets of the topic
 */

router.get("/tweets/:topic", auth, async (req, res) => {
    const user = await Twitter_User.findById(req.user._id);
    if (!user) {
        const u = await User.findById(req.user._id);
        if (u) return res.status(401).end();
    }
    let bytes = CryptoJs.AES.decrypt(user.token, config.get('AES_secret'));
    const tok_originalText = bytes.toString(CryptoJs.enc.Utf8);
    bytes = CryptoJs.AES.decrypt(user.tokenSecret, config.get('AES_secret'));
    const sec_originalText = bytes.toString(CryptoJs.enc.Utf8);

    var T = new Twit({
        consumer_key: config.get('cons_key'),
        consumer_secret: config.get('sec_key'),
        access_token: tok_originalText,
        access_token_secret: sec_originalText,
        timeout_ms: 60 * 1000,
    });

    T.get(
        "search/tweets",
        {
            q: `${req.params.topic}`,
            count: 5,
            result_type: "popular",
        },
        function (err, data, response) {
            if (err || data.statuses.length < 4) return res.status(404).send('no tweet :/');
            res.send([
                {
                    text: data.statuses[0].text,
                    favorite_count: data.statuses[0].favorite_count,
                    retweet_count: data.statuses[0].retweet_count,
                    date: data.statuses[0].created_at,
                    user_name: data.statuses[0].user.screen_name,
                    user_profile_img: data.statuses[0].user.profile_image_url,
                },
                {
                    text: data.statuses[1].text,
                    favorite_count: data.statuses[1].favorite_count,
                    retweet_count: data.statuses[1].retweet_count,
                    date: data.statuses[1].created_at,
                    user_name: data.statuses[1].user.screen_name,
                    user_profile_img: data.statuses[1].user.profile_image_url,
                },
                {
                    text: data.statuses[2].text,
                    favorite_count: data.statuses[2].favorite_count,
                    retweet_count: data.statuses[2].retweet_count,
                    date: data.statuses[2].created_at,
                    user_name: data.statuses[2].user.screen_name,
                    user_profile_img: data.statuses[2].user.profile_image_url,
                },
                {
                    text: data.statuses[3].text,
                    favorite_count: data.statuses[3].favorite_count,
                    retweet_count: data.statuses[3].retweet_count,
                    date: data.statuses[3].created_at,
                    user_name: data.statuses[3].user.screen_name,
                    user_profile_img: data.statuses[3].user.profile_image_url,
                },
            ]);
        }
    );
});

/**
 * @api {post} /twitter/tweets/ Post tweet on twitter
 * @apiName PostTweet
 * @apigroup Twitter
 * @apiBody {String} tweet tweet to post on twitter
 */
router.post("/tweets", auth, async (req, res) => {
    const user = await Twitter_User.findById(req.user._id);
    let bytes = CryptoJs.AES.decrypt(user.token, config.get('AES_secret'));
    const tok_originalText = bytes.toString(CryptoJs.enc.Utf8);
    bytes = CryptoJs.AES.decrypt(user.tokenSecret, config.get('AES_secret'));
    const sec_originalText = bytes.toString(CryptoJs.enc.Utf8);

    var T = new Twit({
        consumer_key: config.get('cons_key'),
        consumer_secret: config.get('sec_key'),
        access_token: tok_originalText,
        access_token_secret: sec_originalText,
        timeout_ms: 60 * 1000,
    });
    T.post(
        "statuses/update",
        { status: `${req.body.tweet}` },
        function (err, data, response) {
            res.status(200).end();
        }
    );
});

module.exports = router;
