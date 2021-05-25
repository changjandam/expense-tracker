const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  
  console.log("get")
})


module.exports = router