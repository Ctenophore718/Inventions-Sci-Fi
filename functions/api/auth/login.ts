// @ts-nocheck
import { badRequest, ensureSchema, Env, json, serverError, verifyPassword, generateToken } from '../_utils';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const env = context.env as Env;
    await ensureSchema(env);
    const body = await context.request.json();
    const username = body.username?.trim();
    const password = body.password || '';
    if (!username || !password) return badRequest('Username and password required');

    const user = await env.DB.prepare('SELECT id, username, password_hash, salt FROM users WHERE username = ?').bind(username).first();
    if (!user) return json({ error: 'Invalid credentials' }, 401);

    const ok = await verifyPassword(password, user.salt, user.password_hash);
    if (!ok) return json({ error: 'Invalid credentials' }, 401);

    const token = generateToken();
    const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30;
    await env.DB.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)').bind(token, user.id, expiresAt).run();

    return json({ token, user: { id: user.id, username: user.username } });
  } catch (e) {
    console.error('Login error', e);
    return serverError();
  }
};
