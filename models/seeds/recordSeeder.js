const db = require('../../config/mongoose')
const Record = require('../record')
const User = require('../user')
const bcrypt = require('bcryptjs')
const record = [
  { name: '早餐', category: '餐飲食品', date: '2017-01-04', amount: 100 },
  { name: '午餐', category: '餐飲食品', date: '2017-01-04', amount: 70 },
  { name: 'Model S', category: '家居物業', date: '2017-01-04', amount: 3000000 }
]
const user1 = { name: 'user1', email: 'user1@example.com', password: '1234' }

db.once('open', async () => {
  try {
    const salt = await bcrypt.genSalt(10)
    const user = await User.create({
      name: user1.name,
      email: user1.email,
      password: await bcrypt.hash(user1.password, salt)
    })
    for (let i = 0; i < record.length; i++) {
      await Record.create(
        {
          name: record[i].name,
          category: record[i].category,
          date: record[i].date,
          amount: record[i].amount,
          userId: user._id
        }
      )
    }
  } catch (err) {
    console.log(err)
  }
  db.close()
  console.log('category seed done')
})
