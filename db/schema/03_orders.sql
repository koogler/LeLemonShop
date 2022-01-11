DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  quantity SMALLINT DEFAULT 0,
  ordered_at TIMESTAMP DEFAULT Now(),
  prep_time TIMESTAMP DEFAULT Now() + time '00:05'
);
