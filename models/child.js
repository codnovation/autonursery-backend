'use strict';

import mongoose from 'mongoose';

// Define the child model schema
const ChildSchema = new mongoose.Schema({
});

module.exports = mongoose.model('Child', ChildSchema);
