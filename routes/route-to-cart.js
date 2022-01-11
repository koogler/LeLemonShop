const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const foodID = req.body.id;
    const qp = [foodID]
    let query = `
    SELECT name, price
    FROM food_items
    WHERE id = $1
    `
    db.query(query, pg)
      .then(data => {
        const item = data.rows
        res.json({item})
      })
      .catch(err => {
        res.status(500).send("No Lemons here")
      })
  })

  router.post("/", (req, res) => {
    
  })

  router.post("/", (req, res) => {
    
  })

  router.post("/", (req, res) => {
    
  })
}