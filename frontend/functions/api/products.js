export async function onRequest(context) {
  try {
    const { DB } = context.env;

    if (!DB) {
      return new Response(JSON.stringify({ error: "D1 database binding not found" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const { results } = await DB.prepare("SELECT * FROM products").all();

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}