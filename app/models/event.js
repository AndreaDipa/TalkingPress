const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    comment: {
        type: String
    }
});
const Event = mongoose.model('Event', eventSchema);

module.exports.Event = Event;
module.exports.eventSchema = eventSchema;