const pool = require("../database/")

async function getClassifications(){
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name"
  )
}
async function getInventoryByClassificationId(classification_id) {
  return await pool.query(
    "SELECT * FROM public.inventory WHERE classification_id = $1",
    [classification_id]
  )
}
async function getInventoryById(inv_id) {
  try {
    const data = await pool.query(
      "SELECT * FROM public.inventory WHERE inv_id = $1",
      [inv_id]
    )
    return data.rows[0]
  } catch (error) {
    console.error("getInventoryById error " + error)
  }
}
module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getInventoryById
}