'use strict';

import mongoose from 'mongoose';

// Define the class model schema
const ClassSchema = new mongoose.Schema({
    name: String,
    teachers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    children: [{type: mongoose.Schema.Types.ObjectId, ref: 'Child'}],
    sections: [{type: mongoose.Schema.Types.ObjectId, ref: 'Section'}]
});

module.exports = mongoose.model('Class', ClassSchema);
