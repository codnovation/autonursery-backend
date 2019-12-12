'use strict';

import mongoose from 'mongoose';

// Define the event model schema
const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    type: String
});

module.exports = mongoose.model('Event', EventSchema);
