import mongoose from 'mongoose';

// define the Messages model schema
const MessagesSchema = new mongoose.Schema({
    title: String,
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    rcvr: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
    date: Date,
    description: String,
});

module.exports = mongoose.model('Message', MessagesSchema);
