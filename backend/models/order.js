const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  order_id: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Order', orderSchema);
