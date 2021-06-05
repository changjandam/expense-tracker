const express = require('express')
const exphbs = require('express-handlebars')
const methodOverrride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')

const app = express()
const PORT = 3000

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverrride('_method'))
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: require('./config/hbs-helpers.js') }))
app.set('view engine', 'hbs')
require('./config/mongoose')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(flash())
app.use((req, res, next) => {
  // res.locals.isAuthenticated = req.isAuthenticated()
  // res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`The web is running on http://localhost:${PORT}`)
})
