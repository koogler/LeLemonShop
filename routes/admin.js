const express = require('express');
const router  = express.Router();

/////////////////////////////
// Retrieve full menu list //
/////////////////////////////

module.exports = (db) => {
  router.get("/admin", (req, res) => {
    let query = `
    SELECT * FROM menu_orders
    ORDER BY order_id;
    `;

    db.query(query)
      .then(data => {
        console.log(item)
        const item = data.rows;
        res.json(item);
      })
      .catch(err => {
        res.status(500).send("No Lemons here");
      });
  });

  router.post("/admin", (req, res) => {
    let query = `
    SELECT * FROM menu_orders
    ORDER BY order_id;
    `;

    db.query(query)
      .then(data => {
        const item = data.rows;
        console.log(item)
        res.json(item);
      })
      .catch(err => {
        res.status(500).send("I've stapled the lemons to the wall");
      });
  })

  return router;
};