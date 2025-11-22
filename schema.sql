-- Neon DB Schema Migration
-- Run this SQL in your Neon database to create the required tables

-- Guestbook table
CREATE TABLE IF NOT EXISTS guestbook (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  created_by VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Views table
CREATE TABLE IF NOT EXISTS views (
  slug VARCHAR(255) PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0
);

-- Create index on guestbook updated_at for faster sorting
CREATE INDEX IF NOT EXISTS idx_guestbook_updated_at ON guestbook(updated_at DESC);













