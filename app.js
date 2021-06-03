const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverrride = require('method-override')

const routes = require('./routes')

const app = express()
const PORT = 3000


app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: require('./config/hbs-helpers.js') }))

require('./config/mongoose')

app.use(routes)

app.set('view engine', 'hbs')
app.listen(PORT, () => {
  console.log(`The web is running on http://localhost:${PORT}`)
})