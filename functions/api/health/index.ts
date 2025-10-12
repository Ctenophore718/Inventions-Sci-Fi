// @ts-nocheck
export const onRequestGet: PagesFunction = async () => {
  return new Response(JSON.stringify({ status: 'ok' }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
};