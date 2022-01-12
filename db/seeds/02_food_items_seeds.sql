
-- Current items on menu

INSERT INTO food_items (name, image, description, price)
VALUES
('Raspberry Lemonade', 'https://images.pexels.com/photos/2110927/pexels-photo-2110927.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'Our famous lemonade with a twist of raspberry.', 700),
('Strawberry Lemonade', 'https://images.unsplash.com/photo-1497534446932-c925b458314e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80', 'Our famous lemonade with a twist of Strawberry.', 700),
('Sweet Tea', 'www.lemonbatter.com', 'Our amazing sweet tea, if you are not in the mood for lemonade.', 750),
('Chocolate Chip Cookie', 'https://images.unsplash.com/photo-1625876981820-be17a6807189?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80', 'Fresh chocolate chip cookies, made fresh every morning.', 200),
('Premium Lemonade', 'https://images.unsplash.com/photo-1507281549113-040fcfef650e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'Our specialty lemonade, made with the finest lemons you can find in Canada!', 575);


-- False items for admin view

INSERT INTO food_items (name, image, description, price, isactive)
VALUES
('Hallows Brew', 'www.lionness.com', 'Intense halloween drinks if you are bold enough', 800, FALSE),
('Sour Skids', 'www.lionness.com', 'Ready for something not-so-sweet? Extra lemon, less sugar is what you seek', 600, FALSE),
('Marshmallows Eve', 'www.lionness.com', 'A monster drink with blended sweets, lemonade, and marshmellows', 900, FALSE);