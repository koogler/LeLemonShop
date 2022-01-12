const express = require('express');
const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

const textRoutes = function (db) {
  user = db.

    router.post("/", (req, res) => {
      db.query(`SELECT`)
        .then(data => {

        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message })
        })
    })

  router.post("/pickup-alert", (req, res) => {
    db.query(`SELECT`)
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message })
      })
  })

  router.post("/wait-time-alert", (req, res) => {
    db.query(`SELECT`)
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message })
      })
  })



  return router;

}

module.exports = textRoutes
