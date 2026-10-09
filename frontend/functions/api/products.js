export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (url.pathname === "/api/products") {
      try {
        const db = env?.DB;
        if (!db) {
          return new Response(
            JSON.stringify({ error: "D1 database binding 'DB' is missing in environment." }),
            {
              status: 500,
              headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            }
          );
        }

        const { results } = await db.prepare("SELECT * FROM products").all();
        return new Response(JSON.stringify(results || []), {
          status: 200,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
      } catch (err) {
        return new Response(
          JSON.stringify({ error: err.message || "Internal Server Error" }),
          {
            status: 500,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
          }
        );
      }
    }

    // Safe Static Asset Handling with Fallback
    try {
      if (env && env.ASSETS) {
        let response = await env.ASSETS.fetch(request);
        if (response.status === 404) {
          const indexUrl = new URL("/index.html", request.url);
          response = await env.ASSETS.fetch(new Request(indexUrl, request));
        }
        return response;
      } else {
        return new Response("Assets binding not found", { status: 500 });
      }
    } catch (err) {
      return new Response("Worker Asset Exception: " + err.message, { status: 500 });
    }
  },
};