const express = require('express');
const router  = express.Router();

//////////////////////////////
// Retrieve full admin view //
//////////////////////////////

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `
    SELECT menu_orders.id as id, orders.id as order_id, food_items.name as itemName, users.name as customerName, users.phone as phoneNumer, ordered_at as date
    FROM menu_orders
    JOIN orders ON order_id = orders.id
    JOIN users ON users.id = orders.user_id
    JOIN food_items ON food_items.id = food_id
    ORDER BY order_id;
    `;

    db.query(query)
      .then(data => {
        const item = data.rows;
        res.json(item);
      })
      .catch(err => {
        res.status(500).send("No Lemons here");
      });
  });

  router.post("/", (req, res) => {
    let query = `
    SELECT menu_orders.id as id, orders.id as order_id, food_items.name as itemName, users.name as customerName, users.phone as phoneNumer, ordered_at as date
    FROM menu_orders
    JOIN orders ON order_id = orders.id
    JOIN users ON users.id = orders.user_id
    JOIN food_items ON food_items.id = food_id
    ORDER BY order_id;
    `;

    db.query(query)
      .then(data => {
        const item = data.rows;
        res.json(item);
      })
      .catch(err => {
        res.status(500).send("I've stapled the lemons to the wall");
      });
  })

  return router;
};