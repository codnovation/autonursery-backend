'use strict';

import mongoose from 'mongoose';

// Define the request model schema
const RequestsSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
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
        default: 'Request',
        required: true
    },
    parents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    child: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Child',
        required: true
    }
});

module.exports = mongoose.model('Request', RequestsSchema);
