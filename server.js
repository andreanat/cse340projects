/* ******************************************
 * Primary server file for CSE 340
 * ******************************************/
const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();
const baseController = require("./controllers/baseController");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout/layout");

app.use(express.static(path.join(__dirname, "public")));

/* ***********************
 * Home route
 * *********************** */
app.get("/", baseController.buildHome);

app.use((req, res) => {
  res.status(404).render("index", { title: "Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("index", { title: "Server Error" });
});

const PORT = process.env.PORT || 5500;
const HOST = process.env.HOST || "localhost";
app.listen(PORT, () => {
  console.log(`app listening on http://${HOST}:${PORT}`);
});