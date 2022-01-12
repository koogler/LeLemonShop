const express = require('express');
const router  = express.Router();

/////////////////////////////
// Retrieve full menu list //
/////////////////////////////

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `
    SELECT name, image, description, price
    FROM food_items
    WHERE isActive = TRUE
    ORDER BY name;
    `;

    db.query(query)
      .then(data => {
        const item = data.rows;
        res.json({item});
      })
      .catch(err => {
        res.status(500).send("No Lemons here");
      });
  });
  return router;
};