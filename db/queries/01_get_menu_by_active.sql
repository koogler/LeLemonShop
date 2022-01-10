SELECT name, thumbnail_URL, description, price
FROM food_item
WHERE isActive = 'TRUE'
ORDER BY name;