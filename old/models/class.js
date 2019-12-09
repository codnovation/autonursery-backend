'use strict';

import mongoose from 'mongoose';
//Import Allergy from './Allergy';

// define the Messages model schema
const ClassSchema = new mongoose.Schema({
    name: String,
    number: Number,
    teacher: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
    children: [{type: mongoose.Schema.Types.ObjectId, ref: 'Child'}],
    requests: [{type: mongoose.Schema.Types.ObjectId, ref: 'Request'}],
    sections: [String],
});

module.exports = mongoose.model('Class', ClassSchema);
