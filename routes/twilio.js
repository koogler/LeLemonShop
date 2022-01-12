const express = require('express');
const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

module.exports = function (db) {
  router.post("/", (req, res) => {
    //Variables used to fetch various phone numbers
    const ownerNumber = db.query(`SELECT phone FROM users WHERE id = 1`)
    let latestOrder = db.query(`SELECT order_id FROM orders WHERE id=(SELECT max(id) FROM orders)`);
    db.query(`SELECT phone FROM users WHERE id = 1`)
      .then(data => {
        const phone = data.rows[0]
        console.log(phone)
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

  // router.post("/wait-time-alert", (req, res) => {
  //   db.query(`SELECT`)
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message })
  //     })
  // })



  return router;

}
