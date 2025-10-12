// @ts-nocheck
import { Env, json, ensureSchema, getUserFromAuth, unauthorized, badRequest, serverError } from '../../api/_utils';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const env = context.env as Env;
    await ensureSchema(env);
    const user = await getUserFromAuth(context.request, env);
    if (!user) return unauthorized();
    const rows = await env.DB.prepare('SELECT content FROM character_sheets WHERE user_id = ? ORDER BY updated_at DESC')
      .bind(user.id)
      .all<{ content: string }>();
    const sheets = (rows.results || []).map(r => JSON.parse(r.content));
    return json(sheets);
  } catch (e) {
    console.error('Sheets GET error', e);
    return serverError();
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const env = context.env as Env;
    await ensureSchema(env);
    const user = await getUserFromAuth(context.request, env);
    if (!user) return unauthorized();
    const sheet = await context.request.json();
    if (!sheet?.id) return badRequest('Sheet ID required');
    const content = JSON.stringify(sheet);
    const now = Math.floor(Date.now() / 1000);
    const existing = await env.DB.prepare('SELECT id FROM character_sheets WHERE id = ? AND user_id = ?')
      .bind(sheet.id, user.id)
      .first();
    if (existing) {
      await env.DB.prepare('UPDATE character_sheets SET content = ?, updated_at = ? WHERE id = ? AND user_id = ?')
        .bind(content, now, sheet.id, user.id)
        .run();
    } else {
      await env.DB.prepare('INSERT INTO character_sheets (id, user_id, content, updated_at) VALUES (?, ?, ?, ?)')
        .bind(sheet.id, user.id, content, now)
        .run();
    }
    return json({ success: true, sheet });
  } catch (e) {
    console.error('Sheets POST error', e);
    return serverError();
  }
};
