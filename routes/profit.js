const express = require('express');
const router  = express.Router();

///////////////////////
// View total profit //
///////////////////////

module.exports = (db) => {
  router.get("/:id/order", (req, res) => {
    let query = `
    SELECT SUM() as total-profit
    FROM menu_orders
    JOIN orders ON orders.id = order_id
    JOIN food_items ON food_items.id = food_id`;

    db.query(query)
      .then(data => {
        const items = data.rows;
        res.json({items});
      })
      .catch(err => {
        res.status(500).send("No Lemons here");
      });
  });
  return router;
};