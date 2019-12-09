'use strict';

import mongoose from 'mongoose';
//Import Allergy from './Allergy';

// define the Messages model schema
const ActivitySchema = new mongoose.Schema({
    name: String,
    description: String,
    type: String,
    date: Date
});

module.exports = mongoose.model('Activity', ActivitySchema);
