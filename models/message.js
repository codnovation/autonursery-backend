'use strict';

import mongoose from 'mongoose';

// Define the messages model schema
const MessagesSchema = new mongoose.Schema({
    title: String,
    date: Date,
    body: String,
    from: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    to: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Message', MessagesSchema);
