USE home_db;

-- Create a user table with username and email attributes
CREATE TABLE user (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    username varchar(100) NOT NULL,
    email varchar(100) NOT NULL
); 

-- Create a home table with attributes like street address, state, zip, sqft, beds, baths, and list price
CREATE TABLE home (
    homeId INT AUTO_INCREMENT PRIMARY KEY,
    street_address varchar(255) NOT NULL,
    `state` varchar(50),
    zip varchar(10),
    sqft float,
    beds int,
    baths int,
    list_price float
); 

-- Create a junction table to represent the many-to-many relationship between users and homes
CREATE TABLE user_home_link (
    userId INT,
    homeId INT,
    FOREIGN KEY (userId) REFERENCES user(userId),
    FOREIGN KEY (homeId) REFERENCES home(homeId),
    PRIMARY KEY (userId, homeId)
); 

-- Migrate user data from the user_home table to the user table
INSERT INTO user (username, email)
SELECT DISTINCT username, email FROM user_home;

-- Migrate home data from the user_home table to the home table
INSERT INTO home (street_address, `state`, zip, sqft, beds, baths, list_price)
SELECT DISTINCT street_address, `state`, zip, sqft, beds, baths, list_price FROM user_home;

-- Populate the junction table and match the users and homes from the original user_home table using their respective attributes.
INSERT INTO user_home_link (userId, homeId)
SELECT u.userId, h.homeId
FROM user_home uh
JOIN user u ON uh.username = u.username AND uh.email = u.email
JOIN home h ON uh.street_address = h.street_address;

-- Clean up and drop the original user_home table
DROP TABLE user_home;
