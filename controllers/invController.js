const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invController = {}

invController.buildByClassificationId = async function (req, res) {
  const classification_id = req.params.classificationId

  const data = await invModel.getInventoryByClassificationId(classification_id)
  const nav = await utilities.getNav()

  res.render("inventory/classification", {
    title: "Vehicles",
    nav,
    data,
  })
}

module.exports = invController