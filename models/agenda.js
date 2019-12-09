'use strict';

import mongoose from 'mongoose';

// Define the agenda model schema
const AgendaSchema = new mongoose.Schema({
    date: Date,
    child: {type: mongoose.Schema.Types.ObjectId, ref: 'Child'},
    attendance: {
        type: Boolean,
        default: true
    },
    food: {
        breakfast: {
            type: String,
            enum: ['VeryHappy', 'Happy', 'Normal', 'Sad'],
            default: 'Normal'
        },
        snackOne: {
            type: String,
            enum: ['VeryHappy', 'Happy', 'Normal', 'Sad'],
            default: 'Normal'
        },
        lunch: {
            type: String,
            enum: ['VeryHappy', 'Happy', 'Normal', 'Sad'],
            default: 'Normal'
        },
        snackTwo: {
            type: String,
            enum: ['VeryHappy', 'Happy', 'Normal', 'Sad'],
            default: 'Normal'
        }
    },
    mood: {
        type: String,
        enum: ['VeryHappy', 'Happy', 'Normal', 'Sad'],
        default: 'Normal'
    },
    participation: {
        type: String,
        enum: ['VeryHappy', 'Happy', 'Normal', 'Sad'],
        default: 'Normal'
    },
    wc: String
});

module.exports = mongoose.model('Agenda', AgendaSchema);