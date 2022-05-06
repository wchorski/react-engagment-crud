const mongoose = require('mongoose')

const engagementSchema = new mongoose.Schema({
  dateBorn: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateMod: {
    type: Date,
    required: true,
    default: Date.now
  },
  
  dateGig: {
    type: Date,
    require: true,
    default: Date.now
  },
  address: {
    type: String,
    require: [true, "gig address..."]
  },
  type: {
    type: String, 
    require: [true, "gig type..."]
  },
  client: {
    type: String, 
    require: [true, "client name..."]
  },
  email: {
    type: String,
    require: [true, "client email..."]
  },
  phone: {
    type: String,
    require: [true, "client phone..."]
  },
  employee: {
    type: String, 
    require: [true, "employee name..."]
  },
  options: {
    type: Array, 
  },
})

const Engagement = mongoose.model("Engagement", engagementSchema)
module.exports = Engagement