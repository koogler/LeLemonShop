DROP TABLE IF EXISTS food_item;

CREATE TABLE food_item(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP,
);