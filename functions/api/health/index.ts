// @ts-nocheck
import { Env } from '../_utils';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const env = context.env as Env;
  
  const status = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: env.DB ? 'connected' : 'NOT CONFIGURED',
  };
  
  // Try to query the database if it exists
  if (env.DB) {
    try {
      const result = await env.DB.prepare('SELECT 1 as test').first();
      status.database = result ? 'working' : 'error';
    } catch (e) {
      status.database = `error: ${e.message}`;
    }
  }
  
  return new Response(JSON.stringify(status, null, 2), {
    status: env.DB ? 200 : 500,
    headers: { 'content-type': 'application/json' },
  });
};