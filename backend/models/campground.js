const mongoose = require('mongoose');

const campgroundSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  cost: { type: Number, required: true },
  image: { type: String, required: true },
  // createdURL: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  _author: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String }
  },
  status: {
    id: {
      type: String,
      ref: 'Payment'
    }
  }
});

module.exports = mongoose.model('Campground', campgroundSchema);
