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
module.exports = {
  getClassifications,
  getInventoryByClassificationId
}