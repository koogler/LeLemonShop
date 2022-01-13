const express = require('express');
const app = express();
const { user } = require('pg/lib/defaults');
const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const ownerNumber = process.env.TWILIO_EVAN_NUM
const client = require('twilio')(accountSid, authToken)

module.exports = function (db) {

  router.post("/", (req, res) => {
    const user = req.session["user_id"]

    db.query(`SELECT name FROM users WHERE users.id = $1`, user)
      .then(data => {
        const customerName = data.rows[0].name;
        const order = "Lemonade"
        let messageToOwner = `A new order has been placed for ${order} by ${customerName}! Get to work!`;

        db.query(`SELECT phone FROM users WHERE users.id = 1`)
          .then(data => {
            const ownerPhoneNumber = data.rows[0].phone
            client.messages.create({
              to: ownerPhoneNumber,
              from: '+19402896240',
              body: messageToOwner

            })
              .then(message => console.log(message.sid));
          })
          .catch(err => {
            res.status(500).json({ error: err.message });
          });
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


  })
  return router;
}
