const mongoose = require('mongoose')
const Sshema = mongoose.Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true }
})
module.exports = mongoose.model('Category', categorySchema)