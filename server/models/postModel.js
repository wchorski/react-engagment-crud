const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "post must have title..."]
  },
  body: {
    type: String, 
    require: [true, "post needs body..."]
  },
  dateBorn: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateMod: {
    type: Date,
    required: true,
    default: Date.now
  }
})

const Post = mongoose.model("Post", postSchema)
module.exports = Post