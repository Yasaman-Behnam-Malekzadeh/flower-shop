export async function onRequest(context) {
  try {
    // اتصال به دیتابیس D1 از طریق Binding
    const { DB } = context.env;

    if (!DB) {
      return new Response(JSON.stringify({ error: "D1 Binding (DB) is missing in wrangler.toml" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const { results } = await DB.prepare("SELECT * FROM products").all();

    return new Response(JSON.stringify(results), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}