SELECT food_item.name as name, orders.quantity as quantity, SUM(food_item.price * quantity) as total_price
FROM orders
JOIN food_item ON food_item.id = food_id
WHERE orders.id = 1
GROUP BY food_item.name
ORDER BY created_at;