const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'User name needed'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'User password needed'],
  },
  roles: {
    Subscriber: {
      type: Number,
      default: 1003
    },
    Editor: Number,
    Admin: Number
  },
  refreshToken: String
})

const User = mongoose.model('User', userSchema)

module.exports = User