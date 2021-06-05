const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const { name, date, category, amount, merchant } = req.body
  const userId = req.user._id
  Record.create({
    name,
    date,
    category,
    amount,
    userId,
    merchant
  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/:id/edit', async (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  try {
    const record = await Record.findOne({ _id, userId }).lean()
    let categories = await Category.find().lean()
    categories = categories.filter(items => items.name !== record.category)
    record.date = record.date.toISOString().slice(0, 10)
    return res.render('edit', { categories, record })
  } catch (err) {
    console.log(err)
  }
})

router.put('/:id', async (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const { name, date, category, amount, merchant } = req.body
  try {
    const record = await Record.findOne({ _id, userId })
    record.name = name
    record.date = date
    record.category = category
    record.amount = amount
    record.merchant = merchant
    await record.save()
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/select/:method', async (req, res) => {
  const method = req.params.method
  const userId = req.user._id
  try {
    const categories = await Category.find().lean()
    const records = await Record.find({ category: method, userId }).lean()
    let sum = 0
    for (let i = 0; i < records.length; i++) {
      records[i].class = categories.find(category => category.name === records[i].category).class
      sum += records[i].amount
    }

    res.render('index', { categories, records, sum, method })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
