const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)
const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.post('/:orderId/prep-time', function (req, res) {
  const id = req.params.orderId;

  Order.findOne({ _id: id }).then(function (order) {
    order.status = 'In Queue';
    order.notificationStatus = 'Queued';

    order.save()
      .then(function () {
        return order.sendSmsNotification('Your order will be ready for pickup in 20 minutes', getCallbackUri(req));
      })
      .then(function () {
        res.redirect(`/orders/${id}/show`);
      })
      .catch(function (err) {
        res.status(500).send(err.message);
      });
  });
});
