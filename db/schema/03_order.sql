DROP TABLE IF EXISTS order ON DELETE CASCADE;
DROP TABLE IF EXISTS full_ordered ON DELETE CASCADE;
DROP TABLE IF EXISTS order_history;

CREATE TABLE order (
  id INTEGER PRIMARY KEY,
  FOREIGN KEY (food_item.id)
  quantity SMALLINT
);

CREATE TABLE full_ordered (
  id SERIAL PRIMARY KEY
  FOREIGN KEY (order.id)
  created_at TIMESTAMP,
  completed_on TIMESTAMP,
  isActive BOOLEAN
)