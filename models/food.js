import mongoose from 'mongoose';

// define the Messages model schema
const FoodSchema = new mongoose.Schema({
    name: String,
});

module.exports = mongoose.model('Food', FoodSchema);
