DROP TABLE IF EXISTS order ON DELETE CASCADE;
DROP TABLE IF EXISTS full_ordered;

CREATE TABLE order (
  id INTEGER PRIMARY KEY NOT NULL,
  quantity SMALLINT,
  price SMALLINT
);

CREATE TABLE full_ordered (
  order_id FOREIGN KEY REFERENCES order(id),
  food_id FOREIGN KEY REFERENCES food_item(id),
  created_at TIMESTAMP,
  completed_on TIMESTAMP,
  isActive BOOLEAN
)