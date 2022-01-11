const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

client.messages.create({
  to: '+14162741077',
  from: '+19402896240',
  body: 'Fill in order info here.'
})
  .then((message) => console.log(message.sid))
