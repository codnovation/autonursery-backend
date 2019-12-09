'use strict';

import mongoose from 'mongoose';

// Define the request model schema
const RequestsSchema = new mongoose.Schema({
});

module.exports = mongoose.model('Request', RequestsSchema);
