const mongoose = require("mongoose");

const schema = mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: true
  },
  userId: {
    type: String,
    trim: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer"
  },
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session"
  },
  created: {
    type: Date,
    default: Date.now
  }
});

schema.methods.toJSON = function() {
  const obj = this.toObject();
  // eslint-disable-next-line no-underscore-dangle
  delete obj.__v;
  // eslint-disable-next-line no-underscore-dangle
  delete obj._id;
  return obj;
};

module.exports = mongoose.model("Log", schema);
