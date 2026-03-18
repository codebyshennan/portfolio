-- Neon DB Schema
-- Run this SQL in your Neon database to create the required tables

-- Views table
CREATE TABLE IF NOT EXISTS views (
  slug VARCHAR(255) PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0
);
