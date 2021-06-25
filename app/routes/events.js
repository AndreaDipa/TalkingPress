const express = require("express");
const config = require("config");
const { Event } = require("../models/event");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const Twitter_User = require("../models/twitter_user");

const fetch = require("node-fetch");
const router = express.Router();
const url = `https://api.thenewsapi.com/v1/news/top?api_token=${config.get(
    "newsKey"
)}&locale=it,us&limit=1`;

//CRUD
/** 
 * @api {get} /api/events Request generic event
 * @apiName GetEvent
 * @apigroup Events
 * 
 * @apiSuccess {json} event generic event from TheNewsApi
*/
router.get("/", auth, async (req, res) => {
    let data = await fetch(url);
    data = await data.json();
    let event = await Event.findOne({ title: data.data[0].title });
    if (!event) {
        event = new Event({
            title: data.data[0].title,
            description: data.data[0].description,
        });
        await event.save();
    }
    res.send(event);
});
/** 
 * @api {get} /api/events/:cat Event request of category cat
 * @apiName GetEventCat
 * @apigroup Events
 * 
 * @apiParam {String} cat Unique string representing the category of the news that you want 
 * 
 * @apiSuccess {json} event event of category cat from TheNewsApi
*/
router.get("/:cat", auth, async (req, res) => {
    let data = await fetch(url + `&categories=${req.params.cat}`);
    data = await data.json();
    if (data.meta.found == 0) return res.status(404).end();
    let event = await Event.findOne({ title: data.data[0].title });
    if (!event) {
        event = new Event({
            title: data.data[0].title,
            description: data.data[0].description,
        });
        await event.save();
    }
    res.send(event);
});
/** 
 * @api {post} /api/events Save event for the current user
 * @apiName PostEvent
 * @apigroup Events 
 *
 * @apiBody {String} _id   event's id
 * @apiBody {String} title event's title
 * @apiBody {String} description   event's description
 * @apiBody {String} comment   optional comment of the user
 */
router.post("/", auth, async (req, res) => {
    const event = new Event({
        _id: req.body._id,
        title: req.body.title,
        description: req.body.description,
        comment: req.body.comment,
    });
    
    let user = await User.findById(req.user._id);
    if (!user) {
        user = await Twitter_User.findById(req.user._id);
    }
    for (let i = 0; i < user.events.length; i++) {
        if (user.events[i]._id == req.body._id)
            return res.status(409).end();
    }

    user = await User.findByIdAndUpdate(
        req.user._id,
        { $addToSet: { events: event } },
        { new: true }
    ).select("-password");
    
    if (!user) {
        user = await Twitter_User.findByIdAndUpdate(
            req.user._id,
            { $addToSet: { events: event } },
            { new: true }
        );
        if (!user) return res.status(404).send("user not found");
    }
    
    res.status(200).end();
});
/** 
 * @api {delete} /api/events/:id Delete event for the current user
 * @apiName DeleteEvent
 * @apigroup Events 
 * 
 * @apiParam {String} id event's id
 * 
 * 
*/
router.delete("/:id", auth, async (req, res) => {
    let user = await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { events: { _id: req.params.id } } },
        { new: true }
    );
    if (!user) {
        user = await Twitter_User.findByIdAndUpdate(
            req.user._id,
            { $pull: { events: { _id: req.params.id } } },
            { new: true }
        );
        if (!user) return res.status(404).send("user or event not found");
    }
    res.status(200).end();
});
/** 
 * @api {put} /api/events/:id Modify event for the current user
 * @apiName PutEvent
 * @apigroup Events
 * @apiParam {String} id event's id

 * @apiSuccess {json} event event modified
 * 
*/
router.put("/:id", auth, async (req, res) => {
    let user = await User.findOneAndUpdate(
        { _id: req.user._id, "events._id": req.params.id },
        {
            $set: {
                "events.$.comment": req.body.comment,
            },
        },
        async (error, success) => {}
    ).select("-password");

    if (!user) {
        user = await Twitter_User.findOneAndUpdate(
            { _id: req.user._id, "events._id": req.params.id },
            {
                $set: {
                    "events.$.comment": req.body.comment,
                },
            },
            async (error, success) => {}
        );
        if (!user) return res.status(404).send("user not found");
    }
    let event;
    for (let i = 0; i < user.events.length; i++) {
        if (user.events[i]._id == req.params.id)
            event = user.events[i];
    }
    res.send(event);
});
module.exports = router;
