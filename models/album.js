import mongoose from 'mongoose';
//Import Allergy from './Allergy';

// define the Messages model schema
const AlbumSchema = new mongoose.Schema({
    name: String,
    photos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Photo'}],
});

module.exports = mongoose.model('Album', AlbumSchema);
