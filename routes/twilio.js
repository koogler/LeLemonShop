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
    let query = `
      SELECT phone, name
      FROM users
      WHERE users.id = $1
    `;
    db.query(query, user)
      .then(data => {
        const customerPhoneNumber = data.rows[0].phone;
        const customerName = data.rows[0].name;
        const order = req.body
        console.log(order)

        let messageToOwner = `A customer (${customerName}) has placed an order for `;
        // let messageToCustomer = `Thank you ${customerName}. You have placed an order for `;
        for (const item of order) {
          messageToOwner += `${item.quantity} ${item.name}, `
          // messageToCustomer += `${item.quantity} ${item.name}, `
        };
        const textMessageToOwner = messageToOwner.substring(0, messageToOwner.length - 2) + "!";

        let queryString = `
        SELECT phone
        FROM users
        WHERE users.id = 1
      `;
        db.query(queryString)
          .then(data => {
            const bossPhoneNumber = data.rows[0].phone_number;

            client.messages.create({
              to: bossPhoneNumber,
              from: '+19402896240',
              body: textMessageToOwner

            })
              .then(message => console.log(message.sid));
          })
          .catch(err => {
            res.status(500).json({ error: err.message });
          });

        // router.post("/", (req, res) => {
        //   //Variables used to fetch various phone numbers

        //   // let latestOrder = db.query(`SELECT order_id FROM orders WHERE id=(SELECT max(id) FROM orders)`);
        //   const customer = req.session['user_id']
        //   db.query(`SELECT phone FROM users WHERE id = $1`, [customer])
        //     .then(data => {
        //       const phone = data.rows[0].phone;
        //       const order = 'chicken sandwich'
        //       let messageToCustomer = "An order has been placed. Includes:"
        //       // for (const food of order) {
        //       //   message += ` ${food.name}: ${food.quantity} `
        //       // }
        //       client.messages.create({ body: test, from: '+19402896240', to: '+4162741077' })
        //         .then(message => console.log(message.sid));
        //     })
        //     .catch(err => {
        //       res
        //         .status(500)
        //         .json({ error: err.message })
        //     })
        // })

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

  })
  return router;
}
