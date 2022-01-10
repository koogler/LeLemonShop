DROP TABLE IF EXISTS food_item;

CREATE TABLE food_item(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  thumbnail_URL VARCHAR(2083),
  description TEXT,
  price SMALLINT,
  created_at TIMESTAMP,
);