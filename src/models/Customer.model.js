const mongoose = require("mongoose");

const schema = mongoose.Schema({
  nif: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    required: true
  },
  firstname: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true
  },
  lastname: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
    unique: true
  },
  phone: {
    type: Number
  },
  birthdate: {
    type: Date
  },
  LGPD: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
    default: "",
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

// eslint-disable-next-line func-names
schema.methods.toJSON = function() {
  const obj = this.toObject();
  // eslint-disable-next-line no-underscore-dangle
  delete obj.__v;
  // eslint-disable-next-line no-underscore-dangle
  obj.id = obj._id;
  // eslint-disable-next-line no-underscore-dangle
  delete obj._id;
  return obj;
};

module.exports = mongoose.model("Customer", schema);
