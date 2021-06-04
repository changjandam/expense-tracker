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
  const { name, date, category, amount } = req.body
  Record.create({
    name,
    date,
    category,
    amount
  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/:id/edit', async (req, res) => {
  const _id = req.params.id
  try {
    let categories = await Category.find().lean()
    const record = await Record.findById({ _id }).lean()
    console.log()
    categories = categories.filter(items => items.name !== record.category)
    record.date = record.date.toISOString().slice(0, 10)
    return res.render('edit', { categories, record })
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  Record.findOne({ _id })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
