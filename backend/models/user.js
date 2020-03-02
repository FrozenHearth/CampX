const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  avatarName: {
    type: String,
    required: true,
    unique: true
  },
  contactNumber: {
    type: Number,
    required: true,
    unique: true
  },
  _payment: {
    status: {
      type: Number,
      ref: 'Payment'
    }
  }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
