const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invController = {}
invController.buildManagement = async function (req, res, next) {
  const nav = await utilities.getNav()

  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
    errors: null,
  })
}

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
  try {
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
  } catch (error) {
    next(error)
  }
}

invController.triggerError = async function (req, res, next) {
  throw new Error("Intentional 500 error")
}
invController.buildAddClassification = async function (req, res, next) {
  const nav = await utilities.getNav()

  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  })
}

invController.addClassification = async function (req, res) {
  const nav = await utilities.getNav()
  const { classification_name } = req.body

  const addResult = await invModel.addClassification(classification_name)

  if (addResult) {
    req.flash("notice", `The ${classification_name} classification was successfully added.`)
    const nav = await utilities.getNav()
    res.render("inventory/management", {
      title: "Inventory Management",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the classification was not added.")
    res.status(501).render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors: null,
    })
  }
}
module.exports = invController