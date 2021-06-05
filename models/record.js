const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  userId: { type: String, required: true },
  merchant: { type: String }
})
module.exports = mongoose.model('Record', recordSchema)
