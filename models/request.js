'use strict';

import mongoose from 'mongoose';

// Define the request model schema
const RequestsSchema = new mongoose.Schema({
    description: String,
    date: Date,
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    },
    priority: {
        type: String,
        enum: ['High', 'Meduim', 'Low'],
        default: 'Meduim'
    },
    title: {
        type: String,
        default: 'Request'
    },
    parents: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    child: {type: mongoose.Schema.Types.ObjectId, ref: 'Child'}
});

module.exports = mongoose.model('Request', RequestsSchema);
