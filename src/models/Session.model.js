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

// eslint-disable-next-line func-names
schema.methods.toJSON = function() {
  const obj = this.toObject();
  // eslint-disable-next-line no-underscore-dangle
  delete obj.__v;
  // eslint-disable-next-line no-underscore-dangle
  obj.id = obj._id;
  // eslint-disable-next-line no-underscore-dangle
  delete obj._id;
  // eslint-disable-next-line no-underscore-dangle
  obj.customer.id = obj.customer._id;
  // eslint-disable-next-line no-underscore-dangle
  delete obj.customer._id;
  return obj;
};

module.exports = mongoose.model("Session", schema);
