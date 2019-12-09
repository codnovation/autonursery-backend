'use strict';

import mongoose from 'mongoose';

// Define the child model schema
const ChildSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    dateOfBirth: Date,
    bloodType: String,
    medicalConditions: [String],
    parents: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    section: {type: mongoose.Schema.Types.ObjectId, ref: 'Section'},
    class: {type: mongoose.Schema.Types.ObjectId, ref: 'Class'}
});

module.exports = mongoose.model('Child', ChildSchema);
