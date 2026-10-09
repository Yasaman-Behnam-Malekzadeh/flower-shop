export async function onRequest(context) {
  const { env } = context;
  const { results } = await env.DB.prepare("SELECT * FROM products").all();
  return Response.json(results);
}