'use strict';

import mongoose from 'mongoose';

// Define the class model schema
const ClassSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: {unique: true}
    },
    sections: [{type: mongoose.Schema.Types.ObjectId, ref: 'Section'}],
    teachers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    children: [{type: mongoose.Schema.Types.ObjectId, ref: 'Child'}]
});

module.exports = mongoose.model('Class', ClassSchema);
