'use strict';

import mongoose from 'mongoose';

// Define the child model schema
const ChildSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    bloodType: String,
    medicalConditions: [String],
    parents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ],
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
        required: true
    },
    requests: [{type: mongoose.Schema.Types.ObjectId, ref: 'Request'}],
    agendas: [{type: mongoose.Schema.Types.ObjectId, ref: 'Agenda'}]
});

module.exports = mongoose.model('Child', ChildSchema);
