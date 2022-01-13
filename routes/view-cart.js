const express = require('express');
const router  = express.Router();

/////////////////////////////
// View food items in cart //
/////////////////////////////

module.exports = (db) => {
  router.get("/", (req, res) => {
    const foodID = req.body.id;
    const qp = [foodID];
    let query = `
    SELECT name, price
    FROM food_items
    WHERE id = $1;
    `;

    db.query(query, qp)
      .then(data => {
        const item = data.rows;
        res.json({item});
      })
      .catch(err => {
        res.status(500).send("I've stapled the lemons to the wall");
      });
  });

  return router;
};