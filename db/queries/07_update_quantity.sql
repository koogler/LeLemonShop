UPDATE menu_orders
SET 
  quantity = menu_orders.quantity + 1
FROM
  menu_orders t
  INNER JOIN food_items c
    ON t.food_id = c.id
WHERE
  menu_orders.food_id = 2;