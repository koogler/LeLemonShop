DROP TABLE IF EXISTS menu_orders CASCADE;

CREATE TABLE menu_orders (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES orders(id)
  food_id INTEGER REFERENCES food_item(id),
  quantity SMALLINT DEFAULT 0,
);
