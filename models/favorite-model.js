const pool = require("../database/")

/* *****************************
 * Add vehicle to favorites
 * *************************** */
async function addFavorite(account_id, inv_id) {
  try {
    const sql = `
      INSERT INTO favorites (account_id, inv_id)
      VALUES ($1, $2)
      RETURNING *
    `
    const result = await pool.query(sql, [account_id, inv_id])
    return result.rows[0]
  } catch (error) {
    console.error("addFavorite error:", error)
    return null
  }
}

/* *****************************
 * Check if favorite already exists
 * *************************** */
async function checkFavorite(account_id, inv_id) {
  try {
    const sql = `
      SELECT * FROM favorites
      WHERE account_id = $1 AND inv_id = $2
    `
    const result = await pool.query(sql, [account_id, inv_id])
    return result.rows[0]
  } catch (error) {
    console.error("checkFavorite error:", error)
    return null
  }
}

/* *****************************
 * Get favorites by account id
 * *************************** */
async function getFavoritesByAccountId(account_id) {
  try {
    const sql = `
      SELECT favorites.favorite_id, inventory.*
      FROM favorites
      JOIN inventory
      ON favorites.inv_id = inventory.inv_id
      WHERE favorites.account_id = $1
    `
    const result = await pool.query(sql, [account_id])
    return result.rows
  } catch (error) {
    console.error("getFavorites error:", error)
    return []
  }
}

/* *****************************
 * Remove favorite
 * *************************** */
async function removeFavorite(favorite_id, account_id) {
  try {
    const sql = `
      DELETE FROM favorites
      WHERE favorite_id = $1 AND account_id = $2
      RETURNING *
    `
    const result = await pool.query(sql, [favorite_id, account_id])
    return result.rows[0]
  } catch (error) {
    console.error("removeFavorite error:", error)
    return null
  }
}

module.exports = {
  addFavorite,
  checkFavorite,
  getFavoritesByAccountId,
  removeFavorite,
}