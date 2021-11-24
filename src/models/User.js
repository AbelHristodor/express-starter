/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  cellular: { type: String, default: null },
  birthDate: { type: Date, default: null },
  email: {
    type: String,
    lowercase: true,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
    },
  },
  // For email auth
  password: { type: String, default: null },
  // For Google Auth
  googleId: { type: String, default: null },
  // Meta Data
  createdAt: { type: Date, default: new Date() },
  lastLoggedIn: { type: Date, default: new Date() },
  // Password Reset Token
  resetToken: { type: String },
  resetTokenExpiry: { type: 'Number' },
  isActive: { type: Boolean, default: true },
});

// eslint-disable-next-line func-names
userSchema.methods.publicFields = function () {
  const { _id, email, firstName, lastName, plan, birthDate, cellular } = this;
  return {
    id: _id,
    email,
    firstName,
    lastName,
    plan,
    birthDate,
    cellular,
  };
};

module.exports = mongoose.model('User', userSchema);
