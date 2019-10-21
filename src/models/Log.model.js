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

module.exports = mongoose.model("Log", schema);
