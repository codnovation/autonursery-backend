'use strict';

import mongoose from 'mongoose';

// define the Messages model schema
const PhotoSchema = new mongoose.Schema({
    url: String,
    name: String,
    album: {type: mongoose.Schema.Types.ObjectId, ref: 'Album'}
});

module.exports = mongoose.model('Photo', PhotoSchema);
