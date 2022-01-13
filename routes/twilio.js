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
        const userName = data.rows[0].name;
        const order = req.body.items
        console.log(order)
        let orderItems = order.reduce((ac, cur) => {
          ac += `${cur.quantity} of ${cur.name}, `;
          return ac;
        }, '');
        orderItems = orderItems.substring(0, orderItems.length - 2)
        let messageToOwner = `A new order has been placed for ${orderItems} by ${userName}! Get to work!`;
        client.messages.create({
          to: ownerNumber,
          from: '+19402896240',
          body: messageToOwner
        })
          .then(message => console.log(message.sid));
      })
      .catch(err => {
        res.status(500)
          .json({ error: err.message });
      });
  })

  router.post("/prep-time", (req, res) => {
    const user = req.session["user_id"]
    db.query(`SELECT name, phone FROM users WHERE users.id = $1`, user)
      .then(data => {
        const userName = data.rows[0].name;
        const userPhone = data.rows[0].phone
        const order = "Lemonade"
        const timeUntilReady = 5
        let messageToUser = `Hi, ${userName}! Your order of ${order} will be ready in ${timeUntilReady} minutes.`;
        db.query(`SELECT phone FROM users WHERE users.id = 1`)
          .then(data => {
            const ownerPhoneNumber = data.rows[0].phone
            client.messages.create({
              to: ownerNumber, //will be userPhone but need to update
              from: '+19402896240',
              body: messageToUser
            })
              .then(message => console.log(message.sid));
          })
          .catch(err => {
            res.status(500)
              .json({ error: err.message });
          });
      })
  })

  router.post("/pickup-alert", (req, res) => {
    const user = req.session["user_id"]
    db.query(`SELECT name, phone FROM users WHERE users.id = $1`, user)
      .then(data => {
        const userName = data.rows[0].name;
        const userPhone = data.rows[0].phone
        const order = "Lemonade"
        let messageToUser = `Hi, ${userName}! Your order of ${order} is ready.`;
        db.query(`SELECT phone FROM users WHERE users.id = 1`)
          .then(data => {
            const ownerPhoneNumber = data.rows[0].phone
            client.messages.create({
              to: ownerNumber,
              from: '+19402896240',
              body: messageToUser
            })
              .then(message => console.log(message.sid));
          })
          .catch(err => {
            res.status(500)
              .json({ error: err.message });
          });
      })
  })


  return router;
}
