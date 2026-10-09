export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. CORS Preflight
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

    // 2. API Endpoint - serve products from D1
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

    // 3. Serve Frontend Assets with SPA fallback (resolves Error 1101 on /shop)
    try {
      const response = await env.ASSETS.fetch(request);
      if (response.status === 404) {
        // Fallback to index.html for client-side routing (/shop, /about, etc.)
        const indexRequest = new Request(new URL("/index.html", request.url), request);
        return await env.ASSETS.fetch(indexRequest);
      }
      return response;
    } catch (e) {
      const indexRequest = new Request(new URL("/index.html", request.url), request);
      return await env.ASSETS.fetch(indexRequest);
    }
  },
};