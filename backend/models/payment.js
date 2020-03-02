const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  razorpay_order_id: {
    type: String
  },
  razorpay_payment_id: {
    type: String
  },
  razorpay_signature: {
    type: String
  },
  _owner: {
    userId: { type: String, ref: 'User' },
    firstName: { type: String }
  },
  _author: {
    userId: { type: String, ref: 'User' }
  },
  paidOn: {
    type: Date
  },
  campgroundId: {
    type: String,
    ref: 'Campground'
  },
  status: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Payment', paymentSchema);
