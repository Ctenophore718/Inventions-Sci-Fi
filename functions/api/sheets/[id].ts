// @ts-nocheck
import { Env, json, ensureSchema, getUserFromAuth, unauthorized } from '../../api/_utils';

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const env = context.env as Env;
  await ensureSchema(env);
  const user = await getUserFromAuth(context.request, env);
  if (!user) return unauthorized();
  const id = context.params.id as string;
  await env.DB.prepare('DELETE FROM character_sheets WHERE id = ? AND user_id = ?').bind(id, user.id).run();
  return json({ success: true });
};
