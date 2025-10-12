// @ts-nocheck
import { Env, json, ensureSchema, getUserFromAuth, unauthorized } from '../_utils';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const env = context.env as Env;
  await ensureSchema(env);
  const user = await getUserFromAuth(context.request, env);
  if (!user) return unauthorized();
  return json({ user });
};
