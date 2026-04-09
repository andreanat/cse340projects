const utilities = require("../utilities/")
const favoriteModel = require("../models/favorite-model")

/* ***************************
 * Build favorites view
 * ************************** */
async function buildFavoritesView(req, res) {
  let nav = await utilities.getNav()
  const account_id = res.locals.accountData.account_id
  const favorites = await favoriteModel.getFavoritesByAccountId(account_id)

  res.render("account/favorites", {
    title: "My Favorites",
    nav,
    errors: null,
    favorites,
  })
}

/* ***************************
 * Add favorite
 * ************************** */
async function addFavorite(req, res) {
  const { inv_id } = req.body
  const account_id = res.locals.accountData.account_id

  const existingFavorite = await favoriteModel.checkFavorite(account_id, inv_id)

  if (existingFavorite) {
    req.flash("notice", "That vehicle is already in your favorites.")
    return res.redirect(`/inv/detail/${inv_id}`)
  }

  const result = await favoriteModel.addFavorite(account_id, inv_id)

  if (result) {
    req.flash("notice", "Vehicle added to favorites.")
  } else {
    req.flash("notice", "Sorry, the vehicle could not be added to favorites.")
  }

  return res.redirect(`/inv/detail/${inv_id}`)
}

/* ***************************
 * Remove favorite
 * ************************** */
async function removeFavorite(req, res) {
  const { favorite_id } = req.body
  const account_id = res.locals.accountData.account_id

  const result = await favoriteModel.removeFavorite(favorite_id, account_id)

  if (result) {
    req.flash("notice", "Favorite removed successfully.")
  } else {
    req.flash("notice", "Sorry, the favorite could not be removed.")
  }

  return res.redirect("/account/favorites")
}

module.exports = {
  buildFavoritesView,
  addFavorite,
  removeFavorite,
}