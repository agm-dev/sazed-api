const mongoose = require("mongoose");

const schema = mongoose.Schema({
  nif: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    required: true
  },
  slug: {
    type: String,
    trim: true,
    index: true,
    unique: true
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

module.exports = mongoose.model("Customer", schema);
