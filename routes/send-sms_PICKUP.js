const accountSid = 'ACddcafc057b6c7f45766540b0ca4a394b'
const authToken = 'f07152d0110358a920fc3b6696022745'

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
