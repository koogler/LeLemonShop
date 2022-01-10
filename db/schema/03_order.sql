DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  user_id INTEGER REFERENCES users(id)
  food_id INTEGER REFERENCES food_item(id),
  quantity SMALLINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT users
    FOREIGN KEY(user_id)
    REFERENCES users(users.id)
    ON DELETE SET NULL
);