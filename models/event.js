'use strict';

import mongoose from 'mongoose';

// Define the event model schema
const EventSchema = new mongoose.Schema({
    name: String,
    description: String,
    date: Date,
    type: String
});

module.exports = mongoose.model('Event', EventSchema);
