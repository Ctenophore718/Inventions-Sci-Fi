// @ts-nocheck
// Optional middleware - can be used for logging or CORS headers on functions
export const onRequest: PagesFunction = async (context) => {
  return await context.next();
};
