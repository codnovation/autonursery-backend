import mongoose from 'mongoose';

// define the Messages model schema
const RequestsSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    },
    priority: {
        type: String,
        enum: ['High', 'Meduim', 'Low'],
        default: 'Meduim'
    },
    title: {
        type: String,
        enum: ['Milk', 'Dipers', 'Request'],
        default: 'Request'
    },
    description: String,
    date: Date,
    rcvr: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
    child: {type: mongoose.Schema.Types.ObjectId, ref: 'Child'},
});

module.exports = mongoose.model('Request', RequestsSchema);
