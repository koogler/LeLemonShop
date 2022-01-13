const express = require('express');
const router  = express.Router();

/////////////////////////////
// View full order from ID //
/////////////////////////////

module.exports = (db) => {
  router.get("/", (req, res) => {
    const orderID = req.params.id;
    const qp = [orderID]
    let query = `
    SELECT food_item.name as name, SUM(food_item.price * quantity) as total_price
    FROM orders
    JOIN food_item ON food_item.id = food_id
    WHERE orders.id = $1
    GROUP BY food_item.name;`;

    db.query(query, qp)
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

/*
  router.post("/", (req, res) => {
    const orderID = req.params.id;
    const qp = [orderID]
    let query = `
    SELECT food_item.name as name, ROUND(SUM(food_item.price * quantity), 2) as total_price
    FROM orders
    JOIN food_item ON food_item.id = food_id
    WHERE orders.id = $1
    GROUP BY food_item.name;`;

    db.query(query, qp)
      .then(data => {
        const items = data.rows;
        res.json({items});
      })
      .catch(err => {
        res.status(500).send("I've stapled the lemons to the wall");
      });
  });
*/