DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  ordered_at TIMESTAMP DEFAULT Now(),
  prep_time TIMESTAMP DEFAULT Now() + time '00:05'
);
