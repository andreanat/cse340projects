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
invController.buildByInventoryId = async function (req, res, next) {
  const inv_id = req.params.invId

  const data = await invModel.getInventoryById(inv_id)

  if (!data) {
    return next({ status: 404, message: "Vehicle not found" })
  }

  const nav = await utilities.getNav()

  const vehicleHTML = utilities.buildVehicleDetail(data)

  res.render("inventory/detail", {
    title: `${data.inv_make} ${data.inv_model}`,
    nav,
    vehicleHTML
  })
}
module.exports = invController