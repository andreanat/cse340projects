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

const app = express()

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