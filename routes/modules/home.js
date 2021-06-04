const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().lean()
    const records = await Record.find().lean()
    let sum = 0
    for (let i = 0; i < records.length; i++) {
      records[i].class = categories.find(category => category.name === records[i].category).class
      sum += records[i].amount
    }

    res.render('index', { categories, records, sum })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
