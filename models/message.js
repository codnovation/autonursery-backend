'use strict';

import mongoose from 'mongoose';

// Define the messages model schema
const MessagesSchema = new mongoose.Schema({
});

module.exports = mongoose.model('Message', MessagesSchema);
