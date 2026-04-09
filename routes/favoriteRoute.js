const express = require("express")
const router = new express.Router()

const favoriteController = require("../controllers/favoriteController")
const utilities = require("../utilities/")

// Build favorites view
router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(favoriteController.buildFavoritesView)
)

// Add favorite
router.post(
  "/add",
  utilities.checkLogin,
  utilities.handleErrors(favoriteController.addFavorite)
)

// Remove favorite
router.post(
  "/remove",
  utilities.checkLogin,
  utilities.handleErrors(favoriteController.removeFavorite)
)

module.exports = router