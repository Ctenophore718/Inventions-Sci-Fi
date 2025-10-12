import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

// CORS configuration - allow your frontend domains
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'https://inventions-sci-fi.pages.dev', // Your Cloudflare Pages domain
  /https:\/\/.*\.pages\.dev$/ // All Cloudflare Pages preview deployments
];

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list or matches regex
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') return allowed === origin;
      if (allowed instanceof RegExp) return allowed.test(origin);
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    if (username.length < 3) {
      return res.status(400).json({ error: 'Username must be at least 3 characters' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    db.get('SELECT id FROM users WHERE username = ?', [username], async (err, existingUser) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Server error' });
      }

      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      // Insert user
      db.run('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, passwordHash], function(err) {
        if (err) {
          console.error('Insert error:', err);
          return res.status(500).json({ error: 'Server error' });
        }

        const userId = this.lastID;
        
        // Generate token
        const token = jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: '30d' });

        res.status(201).json({
          token,
          user: {
            id: userId,
            username
          }
        });
      });
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // Find user
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Server error' });
      }

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Verify password
      const validPassword = await bcrypt.compare(password, user.password_hash);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate token
      const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '30d' });

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username
        }
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({
    user: {
      id: req.user.userId,
      username: req.user.username
    }
  });
});

// Character sheet routes
app.get('/api/sheets', authenticateToken, (req, res) => {
  try {
    db.all('SELECT id, content, updated_at FROM character_sheets WHERE user_id = ? ORDER BY updated_at DESC', [req.user.userId], (err, sheets) => {
      if (err) {
        console.error('Get sheets error:', err);
        return res.status(500).json({ error: 'Server error' });
      }

      const parsedSheets = sheets.map(sheet => JSON.parse(sheet.content));
      res.json(parsedSheets);
    });
  } catch (error) {
    console.error('Get sheets error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/sheets', authenticateToken, (req, res) => {
  try {
    const sheet = req.body;

    if (!sheet.id) {
      return res.status(400).json({ error: 'Sheet ID required' });
    }

    const content = JSON.stringify(sheet);

    // Check if exists
    db.get('SELECT id FROM character_sheets WHERE id = ? AND user_id = ?', [sheet.id, req.user.userId], (err, existing) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Server error' });
      }

      if (existing) {
        // Update
        db.run('UPDATE character_sheets SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?', [content, sheet.id, req.user.userId], (err) => {
          if (err) {
            console.error('Update error:', err);
            return res.status(500).json({ error: 'Server error' });
          }
          res.json({ success: true, sheet });
        });
      } else {
        // Insert
        db.run('INSERT INTO character_sheets (id, user_id, content) VALUES (?, ?, ?)', [sheet.id, req.user.userId, content], (err) => {
          if (err) {
            console.error('Insert error:', err);
            return res.status(500).json({ error: 'Server error' });
          }
          res.json({ success: true, sheet });
        });
      }
    });
  } catch (error) {
    console.error('Save sheet error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/sheets/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;

    db.run('DELETE FROM character_sheets WHERE id = ? AND user_id = ?', [id, req.user.userId], (err) => {
      if (err) {
        console.error('Delete sheet error:', err);
        return res.status(500).json({ error: 'Server error' });
      }
      res.json({ success: true });
    });
  } catch (error) {
    console.error('Delete sheet error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
