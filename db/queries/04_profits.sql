SELECT ROUND(SUM(price * quantity * 100)) as total_profit
FROM menu_orders
JOIN food_item ON food_id = food_item.id
JOIN order ON order_id = order.id;