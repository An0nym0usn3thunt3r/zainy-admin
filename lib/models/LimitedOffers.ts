// models/Modal.js
import mongoose from 'mongoose';

// Define the schema
const LimitedOffersSchema = new mongoose.Schema({
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
const LimitedOffers = mongoose.models.LimitedOffers || mongoose.model('LimitedOffers', LimitedOffersSchema);

export default LimitedOffers;
