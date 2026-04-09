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
      vehicleHTML,
      inv_id: data.inv_id,
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

invController.buildAddInventory = async function (req, res, next) {
  const nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList()

  res.render("inventory/add-inventory", {
    title: "Add New Vehicle",
    nav,
    classificationList,
    errors: null,
  })
}

invController.addInventory = async function (req, res) {
  const nav = await utilities.getNav()

  let classificationList = await utilities.buildClassificationList(
    req.body.classification_id
  )

  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  } = req.body

  const addResult = await invModel.addInventory(
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  )

  if (addResult) {
    req.flash("notice", `The ${inv_make} ${inv_model} was successfully added.`)
    const nav = await utilities.getNav()
    res.render("inventory/management", {
      title: "Inventory Management",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the vehicle was not added.")
    res.status(501).render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classificationList,
      errors: null,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    })
  }
}

module.exports = invController