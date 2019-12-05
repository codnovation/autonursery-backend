import mongoose from 'mongoose';

// define the Messages model schema
const FoodMenuSchema = new mongoose.Schema({
    food: [{type: mongoose.Schema.Types.ObjectId, ref: 'Food'}],
    day: Date,
});

module.exports = mongoose.model('FoodMenu', FoodMenuSchema);
