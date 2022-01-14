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
const twilioRoutes = require("./routes/twilio");
const addToCart = require("./routes/add-to-cart");
const activeMenu = require("./routes/menu");
const orders = require("./routes/orders");
const removeFromCart = require("./routes/remove-item-from-cart");
const allProfit = require("./routes/profit");
const login = require("./routes/login");
const admin = require("./routes/admin");

///////////////////////
// Mounts for Routes //
///////////////////////

app.use("/api/users", usersRoutes(db));
app.use("/api/twilio", twilioRoutes(db))
app.use("/api/login", login(db))
app.use("/api/add-to-cart", addToCart(db));
app.use("/api/menu", activeMenu(db));
app.use("/api/orders", orders(db));
app.use("/api/remove-item-from-cart", removeFromCart(db));
app.use("/api/profits", allProfit(db));
app.use("/api/admin", admin(db))

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/login/:id", (req, res) => {
  const id = req.params.id
  const user = (`SELECT id FROM users WHERE id = $1`, [id])
  req.session['user_id'] = user
  res.redirect("/")
})

app.get("/admin", (req, res) => {
  const query = `
    SELECT order_id, ordered_at as date, prep_time, food_items.name AS food_name, price, quantity,
    user_id, users.name as user_name, users.phone as user_phone
    FROM menu_orders
    JOIN orders ON order_id = orders.id
    JOIN food_items ON food_id = food_items.id
    JOIN users ON user_id = users.id
    ORDER BY order_id DESC;`
  db.query(query)
    .then(data => {
      const dataRows = data.rows;
      const orders = {};
      for (let order of dataRows) {
        if (!orders[order.id]) {
          let orderId = 'orderId-' + order.order_id;
          orders[orderId] = {
            userId: order.user_id,
            userName: order.user_name,
            userPhone: order.user_phone,
            orderId: order.order_id,
            date: order.date,
            contents: [`${[order.food_name]} x ${[order.quantity]}`]
          }
        } else {
          orders[order.id].contents.push(`${[order.food_name]} x ${[order.quantity]}`);
        }
      }
      const templateVars = { orders: orders }
      res.render("admin", templateVars)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send("Error on admin page.")
    });
})

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
