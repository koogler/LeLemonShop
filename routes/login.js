const express = require('express');
const app = express()
const router = express.Router();
const cookieSession = require('cookie-session');
const { ModelBuildPage } = require('twilio/lib/rest/autopilot/v1/assistant/modelBuild');

app.set("view engine", "ejs");
app.use(cookieSession({
  name: 'session',
  keys: ['sdf8g789sdf7g98sdf7g89sdfg79sd8fg7', '89sdf7g089sdjF089SDFJ0sdf']
}));

module.exports = (db) => {
  router.get("/login/:id", (req, res) => {
    const id = req.params.id
    const user = (`SELECT id FROM users WHERE id = $1`, [id])
    req.session['user_id'] = user
    res.redirect("/")
  })
  return router
}
