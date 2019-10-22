const mongoose = require("mongoose");

const customer = mongoose.Schema({
  nif: {
    type: String,
    trim: true,
    index: true,
    required: true
  },
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  }
});

const schema = mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  customer,
  // the id of the user who creates the session
  owner: {
    type: String,
    required: true,
    trim: true,
    index: true
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

module.exports = mongoose.model("Session", schema);
