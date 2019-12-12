'use strict';

import mongoose from 'mongoose';

// Define the section model schema
const SectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: {unique: true}
    },
    children: [{type: mongoose.Schema.Types.ObjectId, ref: 'Child'}],
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    }
});

module.exports = mongoose.model('Section', SectionSchema);
