const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

router.post('/:orderId/pick-up-alert', function (req, res) {
  const id = req.params.orderId;

  Order.findOne({ _id: id })
    .then(function (order) {
      order.status = 'Ready';
      order.notificationStatus = 'Queued';
      order.save()
        .then(function () {
          return order.sendSmsNotification('Your order is ready for pickup!', getCallbackUri(req));
        })
        .then(function () {
          res.redirect(`/orders/${id}/show`);
        })
        .catch(function (err) {
          res.status(500).send(err.message);
        });
    })
});
