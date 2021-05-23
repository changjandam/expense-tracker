const db = require('../../config/mongoose')
const Category = require('../category')
const category = [
  { name: "家居物業", class: "fa-home" },
  { name: "交通出行", class: "fa-shuttle-van" },
  { name: "休閒娛樂", class: "fa-grin-beam" },
  { name: "餐飲食品", class: "fa-utensils" },
  { name: "其他", class: "fa-pen" }
]

db.once('open', async () => {
  for (let i = 0; i < category.length; i++) {
    await Category.create(
      {
        name: category[i].name,
        class: category[i].class
      }
    )
  }
  db.close()
  console.log('category seed done')
})



