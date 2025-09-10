/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")

/* ***********************
 * Routes
 *************************/
app.use(static)

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
const path = require("path")

// --- View engine: EJS ---
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// (optional) serve /public for css/images later
app.use(express.static(path.join(__dirname, "public")))

// --- Home route ---
app.get("/", (req, res) => {
  res.render("index", { title: "CSE 340 Home" })
})

// --- Server ---
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`app listening on localhost:${PORT}`))
