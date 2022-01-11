DROP TABLE IF EXISTS food_items CASCADE;

CREATE TABLE food_items (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  image VARCHAR(2083),
  description TEXT,
  price SMALLINT,
  isActive BOOLEAN DEFAULT 'TRUE'
);
