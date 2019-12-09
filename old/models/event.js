'use strict';

import mongoose from 'mongoose';

// define the Messages model schema
const EventSchema = new mongoose.Schema({
    name: String,
    description: String,
    date: Date,
    image: String,
});

module.exports = mongoose.model('Event', EventSchema);
