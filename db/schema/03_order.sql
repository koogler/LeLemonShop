DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS full_ordered;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  food_id INTEGER REFERENCES food_item(id),
  quantity SMALLINT DEFAULT 0
);

CREATE TABLE full_ordered (
  order_id INTEGER REFERENCES orders(id),
  created_at TIMESTAMP,
  completed_on TIMESTAMP,
  isActive BOOLEAN DEFAULT 'TRUE'
);