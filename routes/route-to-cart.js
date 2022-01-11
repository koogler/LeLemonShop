const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const foodID = req.body.id;
    const qp = [foodID]
    let query = `
    SELECT name, price
    FROM food_items
    WHERE id = ${foodID}
    `
  })

  router.post("/", (req, res) => {
    
  })

  router.post("/", (req, res) => {
    
  })

  router.post("/", (req, res) => {
    
  })
}