const mongoose = require("mongoose");
const { log } = require("../utils/logger");

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
  // the admin has to validate the user to be able to access
  validated: {
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
  const self = this;
  const user = await self.findOne({ id: userData.id });
  if (user) {
    return user;
  }

  const numberOfUsers = await self.countDocuments({});

  const newUserData = Object.assign(userData, {
    admin: !numberOfUsers,
    validated: !numberOfUsers
  });
  const newUser = await self.create(newUserData);
  log(
    `A new user (${newUser.name}) has been created as ${
      newUser.admin ? "admin" : "regular"
    } user`,
    { userId: newUser.id }
  );
  return newUser;
};

module.exports = mongoose.model("User", schema);
