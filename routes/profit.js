const express = require('express');
const router  = express.Router();

///////////////////////
// View total profit //
///////////////////////

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `
    SELECT ROUND(SUM(price * quantity * 100)) as total_profit
    FROM menu_orders
    JOIN orders ON orders.id = order_id
    JOIN food_items ON food_items.id = food_id;`;

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