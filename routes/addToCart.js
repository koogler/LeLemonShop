const express = require('express');
const router  = express.Router();

///////////////////////////////
// Food items to add to cart //
///////////////////////////////

module.exports = (db) => {
  router.post("/", (req, res) => {
    const foodID = req.body.id
    const qp = [foodID]
    let query = `
    UPDATE menu_orders
    SET 
      quantity = menu_orders.quantity + 1
    FROM
      menu_orders t
      INNER JOIN food_items c
        ON t.food_id = c.id
    WHERE
      menu_orders.food_id = $1;`;

    db.query(query, qp)
    .then(data => {
      const item = data.rows;
      res.json({item});
    })
    .catch(err => {
      res.status(500).send("I've stapled the lemons to the wall");
    });
  })
  return router;
};