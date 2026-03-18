const invModel = require("../models/inventory-model")

const invController = {}

invController.buildByClassificationId = async function (req, res) {
  const classification_id = req.params.classificationId

  const data = await invModel.getInventoryByClassificationId(classification_id)

  res.render("inventory/classification", {
    title: "Vehicles",
    data,
  })
}

module.exports = invController