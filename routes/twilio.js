const express = require('express');
const { user } = require('pg/lib/defaults');
const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const ownerNumber = process.env.TWILIO_EVAN_NUM
const client = require('twilio')(accountSid, authToken)

module.exports = function (db) {
  router.post("/", (req, res) => {
    //Variables used to fetch various phone numbers

    // let latestOrder = db.query(`SELECT order_id FROM orders WHERE id=(SELECT max(id) FROM orders)`);
    const customer = req.session['user_id']
    console.log(customer)
    db.query(`SELECT phone FROM users WHERE id = $1`, [customer])
      .then(data => {
        const phone = data.rows[0].phone;
        const order = req.body.items;
        let message = "An order has been placed. Includes:"
        for (const food of order) {
          message += ` ${food.name}: ${food.quantity} `
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message })
      })
  })

  // router.post("/pickup-alert", (req, res) => {
  //   db.query(`SELECT`)
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message })
  //     })
  // })

  // router.post("/prep-time", (req, res) => {
  //   db.query(`SELECT`)
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message })
  //     })
  // })



  return router;

}
