/* ******************************************
 * Primary server file for CSE 340
 * ******************************************/
const utilities = require("./utilities/")
const path = require("path")
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()
const baseController = require("./controllers/baseController")
const invRoute = require("./routes/inventoryRoute")
const session = require("express-session")
const pool = require("./database/")
const accountRoute = require("./routes/accountRoute")
const app = express()
const bodyParser = require("body-parser")
/* ***********************
 * Middleware
 * ************************/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))

app.use("/account", accountRoute)
// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(expressLayouts)
app.set("layout", "layout/layout")

app.use(express.static(path.join(__dirname, "public")))
app.use("/inv", invRoute)

/* ***********************
 * Home route
 * *********************** */
app.get("/", utilities.handleErrors(baseController.buildHome))

/* ************************************
 * File Not Found Route
 * Must be last route in the list
 * ************************************ */
app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." })
})

/* ***********************
 * Express Error Handler
 * Place after all other middleware
 *************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)

  let message
  if (err.status == 404) {
    message = err.message
  } else {
    message = "Oh no! There was a crash. Maybe try a different route?"
  }

  res.render("errors/error", {
    title: err.status || "Server Error",
    message,
    nav
  })
})

const PORT = process.env.PORT || 5500
const HOST = process.env.HOST || "localhost"
app.listen(PORT, () => {
  console.log(`app listening on http://${HOST}:${PORT}`)
})