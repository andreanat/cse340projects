DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS classification CASCADE;
DROP TABLE IF EXISTS account CASCADE;
DROP TYPE IF EXISTS account_type;

CREATE TYPE account_type AS ENUM ('Client', 'Employee', 'Admin');

CREATE TABLE account (
  account_id        SERIAL PRIMARY KEY,
  account_firstname VARCHAR(50)  NOT NULL,
  account_lastname  VARCHAR(50)  NOT NULL,
  account_email     VARCHAR(100) NOT NULL UNIQUE,
  account_password  VARCHAR(255) NOT NULL,
  account_type      account_type NOT NULL DEFAULT 'Client'
);

CREATE TABLE classification (
  classification_id   SERIAL PRIMARY KEY,
  classification_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE inventory (
  inv_id           SERIAL PRIMARY KEY,
  inv_make         VARCHAR(50)  NOT NULL,
  inv_model        VARCHAR(50)  NOT NULL,
  inv_year         INT          NOT NULL,
  inv_description  TEXT         NOT NULL,
  inv_image        VARCHAR(255) NOT NULL,
  inv_thumbnail    VARCHAR(255) NOT NULL,
  inv_price        NUMERIC(10,2) NOT NULL,
  inv_miles        INT          NOT NULL,
  inv_color        VARCHAR(30)  NOT NULL,
  classification_id INT         NOT NULL REFERENCES classification(classification_id)
);

INSERT INTO classification (classification_name)
VALUES ('Sport'), ('SUV'), ('Truck'), ('Sedan'), ('Classic');

INSERT INTO inventory
(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)
VALUES
('Porsche', '911', 2023, 'Iconic sport car', '/images/porsche-911.jpg', '/images/porsche-911-tn.jpg', 110000, 1200, 'red',
 (SELECT classification_id FROM classification WHERE classification_name='Sport')),
('Mazda', 'MX-5', 2022, 'Lightweight sport roadster', '/images/mx5.jpg', '/images/mx5-tn.jpg', 31000, 8000, 'blue',
 (SELECT classification_id FROM classification WHERE classification_name='Sport'));

INSERT INTO inventory
(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)
VALUES
('GM', 'Hummer', 2006, 'Big presence but small interiors. Off-road brute.', '/images/hummer.jpg', '/images/hummer-tn.jpg',
 24000, 85000, 'gray', (SELECT classification_id FROM classification WHERE classification_name='SUV'));

UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

UPDATE inventory
SET inv_image     = REPLACE(inv_image,     '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
