SELECT food_item.name as name, ROUND(SUM(food_item.price * quantity), 2) as total_price
FROM orders
JOIN food_item ON food_item.id = food_id
WHERE orders.id = 1
GROUP BY food_item.name;