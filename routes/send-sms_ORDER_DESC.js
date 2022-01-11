const accountSid = 'ACddcafc057b6c7f45766540b0ca4a394b'
const authToken = 'f07152d0110358a920fc3b6696022745'

const client = require('twilio')(accountSid, authToken)

client.messages.create({
  to: '+14162741077',
  from: '+19402896240',
  body: 'Fill in order info here.'
})
  .then((message) => console.log(message.sid))
