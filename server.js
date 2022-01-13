// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['sdf8g789sdf7g98sdf7g89sdfg79sd8fg7', '89sdf7g089sdjF089SDFJ0sdf']
}));

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.

////////////////
// Middleware //
////////////////
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

////////////
// Routes //
////////////

const usersRoutes = require("./routes/users");
// const twilioRoutes = require("./routes/twilio");
const addToCart = require("./routes/add-to-cart");
const activeMenu = require("./routes/menu");
const orders = require("./routes/orders");
const view = require("./routes/view-cart");
const removeFromCart = require("./routes/remove-item-from-cart");
const allProfit = require("./routes/profit");
const login = require("./routes/login");

///////////////////////
// Mounts for Routes //
///////////////////////

app.use("/api/users", usersRoutes(db));
// app.use("/api/twilio", twilioRoutes(db))
// app.use("/api/login", loginRoutes(db))
app.use("/api/add-to-cart", addToCart(db));
app.use("/api/menu", activeMenu(db));
app.use("/api/orders", orders(db));
app.use("/api/view-cart", view(db));
app.use("/api/remove-item-from-cart", removeFromCart(db));
app.use("/api/profits", allProfit(db));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// app.get("/login/:id", (req, res) => {
//   const id = req.params.id
//   const user = (`SELECT id FROM users WHERE id = $1`, [id])
//   req.session['user_id'] = user
//   res.redirect("/")
// })

app.get("/", (req, res) => {
  const cookieStore = (req.session.userId);
  const templateVars = { userId: cookieStore };
  res.render("index", templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
