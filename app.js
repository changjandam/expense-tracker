const express = require('express')
const exphbs = require('express-handlebars')
const methodOverrride = require('method-override')

const routes = require('./routes')

const app = express()
const PORT = 3000

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverrride('_method'))
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: require('./config/hbs-helpers.js') }))
app.set('view engine', 'hbs')
require('./config/mongoose')

app.use(routes)

app.listen(PORT, () => {
  console.log(`The web is running on http://localhost:${PORT}`)
})
