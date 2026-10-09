DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'student',
  indexNumber TEXT UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, phone, password_hash, name, role, indexNumber)
VALUES ('demo@inspire.edu', '0771234567', '$2b$10$xc8V2RnewqUFiAZHmIXwzeLZIEaTCC62oxwbffV3vvt/TWm4mbb6G', 'Demo Student', 'student', '2024-8901');
-- Password is 'Inspire@2025'
