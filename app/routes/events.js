const express = require('express');
const config = require('config');
const {Event} = require('../models/event');
const {User} = require('../models/user');
const auth = require('../middleware/auth');
const Twitter_User = require('../models/twitter_user');

const fetch = require('node-fetch');
const router = express.Router();
const url = `https://api.thenewsapi.com/v1/news/top?api_token=${config.get('newsKey')}&locale=it&limit=1`;

//CRUD
router.get('/', auth, async (req, res) => {
    let data = await fetch(url);
    data = await data.json();
    let event =await Event.findOne({title: data.data[0].title});
    if (!event) {
        event = new Event({title: data.data[0].title, description: data.data[0].description});
        await event.save();
    }
    res.send(event);
    
    
})

router.get('/:cat', auth, async (req, res) => {
    let data = await fetch(url + `&categories=${req.params.cat}`);
    data = await data.json();
    if (data.meta.found == 0) return res.status(404).end();
    let event =await Event.findOne({title: data.data[0].title});
    if (!event) {
        event = new Event({title: data.data[0].title, description: data.data[0].description});
        await event.save();
    }
    res.send(event);
    
    
})

router.post('/', auth, async (req, res) => {
    
    const event = new Event({title: req.body.title, description: req.body.description, comment: req.body.comment});
    
    let user = await User.findByIdAndUpdate(req.user._id, {'$addToSet': {'events': event}}, {'new': true}).select('-password');
    if (!user) {
        user = await Twitter_User.findByIdAndUpdate(req.user._id, {'$addToSet': {'events': event}}, {'new': true});
        if (!user)
            return res.status(404).send('user not found');
    }
   
    res.send(user);

});

router.delete('/:id', auth, async (req, res) => {
    let user = await User.findByIdAndUpdate(req.user._id, {'$pull': {'events': {'_id': req.params.id}}}, {'new': true});
    if (!user) {
        user = await Twitter_User.findByIdAndUpdate(req.user._id, {'$pull': {'events': {'_id': req.params.id}}}, {'new': true});
        if (!user)
            return res.status(404).send('user or event not found');
    }
    res.send(user);
});

router.put('/:id', auth, async (req, res) => {
    
    let user = await User.findOneAndUpdate({'_id': req.user._id, 'events._id': req.params.id},
                                            {
                                            '$set': {
                                                'events.$.comment': req.body.comment
                                            }}, async (error, success) => {}).select('-password');
    
    
    
    if (!user) {
        user = await User.findOneAndUpdate({'_id': req.user._id, 'events._id': req.params.id},
                                            {
                                            '$set': {
                                                'events.$.comment': req.body.comment
                                            }}, async (error, success) => {});
        if (!user)
            return res.status(404).send('user not found');
    }
    res.send(user);
});
module.exports = router;