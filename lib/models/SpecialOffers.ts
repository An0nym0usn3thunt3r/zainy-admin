// models/Modal.js
import mongoose from 'mongoose';

// Define the schema
const SpecialOffersSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

// Create and export the Mongoose model
const SpecialOffers = mongoose.models.SpecialOffers || mongoose.model('SpecialOffers', SpecialOffersSchema);

export default SpecialOffers;
