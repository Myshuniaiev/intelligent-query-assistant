-- /db/schema.sql
CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  region TEXT NOT NULL,
  product TEXT NOT NULL,
  quantity INT NOT NULL,
  revenue NUMERIC(12,2) NOT NULL
);

-- Optional: users table for customer-based queries
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  signup_date DATE NOT NULL
);