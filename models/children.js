import mongoose from 'mongoose';
//Import Allergy from './Allergy';

// define the Messages model schema
const ChildrenSchema = new mongoose.Schema({

  firstName: String,
  lastName: String,
  locations: String,
  parents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  dateOfBirth: Date,
  gender: String,
  bloodType: String,
  medicalConditions: [String],
  section: {
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    section_name: String,
    // index: Number
  },
  allergies: [String],
  agenda: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agenda' }],
  currentAgenda: { type: mongoose.Schema.Types.ObjectId, ref: 'Agenda' },
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }],
  activity: [{ type: mongoose.Schema.Types.ObjectId, ref: 'activity' }]
});

module.exports = mongoose.model('Child', ChildrenSchema);
