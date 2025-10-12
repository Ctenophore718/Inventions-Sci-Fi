// @ts-nocheck
import { badRequest, ensureSchema, Env, json, serverError, hashPassword, generateToken } from '../_utils';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const env = context.env as Env;
    await ensureSchema(env);
    const body = await context.request.json() as { username?: string; password?: string };
    const username = body.username?.trim();
    const password = body.password || '';
    if (!username || !password) return badRequest('Username and password required');
    if (username.length < 3) return badRequest('Username must be at least 3 characters');
    if (password.length < 6) return badRequest('Password must be at least 6 characters');

    // Check existing
    const existing = await env.DB.prepare('SELECT id FROM users WHERE username = ?').bind(username).first();
    if (existing) return badRequest('Username already exists');

    const { saltB64, hashB64 } = await hashPassword(password);
    await env.DB.prepare('INSERT INTO users (username, password_hash, salt) VALUES (?, ?, ?)').bind(username, hashB64, saltB64).run();

    const user = await env.DB.prepare('SELECT id, username FROM users WHERE username = ?').bind(username).first<{ id: number; username: string }>();
    if (!user) return serverError();

    const token = generateToken();
    const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30; // 30 days
    await env.DB.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)').bind(token, user.id, expiresAt).run();

    return json({ token, user: { id: user.id, username: user.username } });
  } catch (e) {
    console.error('Signup error', e);
    return serverError();
  }
};
