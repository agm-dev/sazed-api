const mongoose = require("mongoose");

const schema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  name: {
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
  admin: {
    type: Boolean,
    default: false
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

/**
 * This is required by noswbi if you want to store
 * user info on social login success
 */
schema.statics.findOrCreate = async function findOrCreate(userData) {
  // TODO: try without self=this
  const self = this;
  const user = await self.findOne({ id: userData.id });
  if (user) {
    return user;
  }
  // TODO: add here if it's the first user on database, make it admin {...userData: admin: true}
  const newUser = await self.create(userData);
  return newUser;
};

module.exports = mongoose.model("User", schema);
