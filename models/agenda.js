import mongoose from 'mongoose';
//Import Allergy from './Allergy';

// define the Messages model schema
const AgendaSchema = new mongoose.Schema({
  date: Date,
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
  },
  nap: {
    type: String,
    enum: ['30 min', '45 min', '60 min', '90 min'],
    default: '30 min'
  },
  wc: String,
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
  child: { type: mongoose.Schema.Types.ObjectId, ref: 'Child' },
  attendance: {
    type: Boolean,
    default: true
  },
  more: String
});

module.exports = mongoose.model('Agenda', AgendaSchema);
