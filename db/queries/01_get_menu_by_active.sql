SELECT name, image, description, price
FROM food_item
WHERE isActive = 'TRUE'
ORDER BY name;