// @ts-nocheck
// Cloudflare Pages Functions shared utils (D1 + crypto helpers)
export interface Env {
  DB: D1Database;
}

export const json = (data: unknown, init: number | ResponseInit = 200) =>
  new Response(JSON.stringify(data), {
    status: typeof init === 'number' ? init : init.status,
    headers: { 'content-type': 'application/json' },
    ...(typeof init === 'object' ? init : {}),
  });

export const badRequest = (msg: string) => json({ error: msg }, 400);
export const unauthorized = (msg = 'Unauthorized') => json({ error: msg }, 401);
export const forbidden = (msg = 'Forbidden') => json({ error: msg }, 403);
export const serverError = (msg = 'Server error') => json({ error: msg }, 500);

// Ensure schema exists (idempotent)
export async function ensureSchema(env: Env) {
  // D1 exec() requires statements separated into a batch
  // Note: PRAGMA is not needed in D1 as foreign keys are enabled by default
  await env.DB.batch([
    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        created_at INTEGER DEFAULT (strftime('%s','now'))
      )
    `),
    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS sessions (
        token TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL,
        expires_at INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `),
    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS character_sheets (
        id TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        updated_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `),
    env.DB.prepare(`
      CREATE INDEX IF NOT EXISTS idx_sheets_user_id ON character_sheets(user_id)
    `)
  ]);
}

// Password hashing using PBKDF2 (bcrypt isn't available in Workers)
export async function hashPassword(password: string, salt?: Uint8Array) {
  const enc = new TextEncoder();
  const saltBytes = salt ?? crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const iterations = 150_000; // reasonable balance for Workers
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBytes,
      iterations,
      hash: 'SHA-256',
    },
    keyMaterial,
    256
  );
  const hashBytes = new Uint8Array(bits);
  return {
    saltB64: btoa(String.fromCharCode(...saltBytes)),
    hashB64: btoa(String.fromCharCode(...hashBytes)),
    iterations,
  };
}

export async function verifyPassword(password: string, saltB64: string, hashB64: string) {
  const saltBytes = new Uint8Array(atob(saltB64).split('').map(c => c.charCodeAt(0)));
  const { hashB64: recomputed } = await hashPassword(password, saltBytes);
  // constant-time compare
  if (recomputed.length !== hashB64.length) return false;
  let diff = 0;
  for (let i = 0; i < recomputed.length; i++) diff |= recomputed.charCodeAt(i) ^ hashB64.charCodeAt(i);
  return diff === 0;
}

export function generateToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function getUserFromAuth(request: Request, env: Env) {
  const auth = request.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return null;
  const now = Math.floor(Date.now() / 1000);
  const session = await env.DB.prepare(
    'SELECT sessions.user_id, users.username FROM sessions JOIN users ON users.id = sessions.user_id WHERE token = ? AND expires_at > ?'
  ).bind(token, now).first<{ user_id: number; username: string }>();
  if (!session) return null;
  return { id: session.user_id, username: session.username };
}
