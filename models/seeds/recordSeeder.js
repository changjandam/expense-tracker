const db = require('../../config/mongoose')
const Record = require('../record')
const record = [
  { name: "早餐", category: "餐飲食品", date: "2017-01-04T16:00:00.000Z", amount: 100}
]

db.once('open', async () => {
  for (let i = 0; i < record.length; i++) {
    await Record.create(
      {
        name: record[i].name,
        category: record[i].category,
        date: record[i].date,
        amount: record[i].amount
      }
    )
  }
  db.close()
  console.log('category seed done')
})