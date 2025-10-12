import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new sqlite3.Database(join(__dirname, 'database.db'), (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

// Create users table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) console.error('Error creating users table:', err);
  else console.log('Users table ready');
});

// Create character_sheets table
db.run(`
  CREATE TABLE IF NOT EXISTS character_sheets (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`, (err) => {
  if (err) console.error('Error creating character_sheets table:', err);
  else console.log('Character sheets table ready');
});

// Create index for faster lookups
db.run(`
  CREATE INDEX IF NOT EXISTS idx_sheets_user_id ON character_sheets(user_id)
`, (err) => {
  if (err) console.error('Error creating index:', err);
  else console.log('Database initialized successfully');
});

export default db;
