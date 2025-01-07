-- Use the game_db database
USE game_db;

-- Insert initial data into the base_market table (Optional)
INSERT INTO base_market (resource_type, base_price)
VALUES 
('wood', 10.00), 
('crop', 15.00), 
('fish', 12.00);

-- Example user data (for testing purposes)
-- You will need to hash the passwords before inserting them into the users table
--INSERT INTO users (username, password)
--VALUES 
--('player1', 'hashed_password_here'), 
--('player2', 'hashed_password_here');
