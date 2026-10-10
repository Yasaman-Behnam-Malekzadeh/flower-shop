export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Handle CORS preflight
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

    // 2. API Route for Products
    if (url.pathname === "/api/products") {
      try {
        const db = env?.DB;
        if (!db) {
          return new Response(
            JSON.stringify({ error: "D1 database binding 'DB' is missing." }),
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

    // 3. Static Asset & SPA Route Handler
    if (env && env.ASSETS) {
      try {
        let response = await env.ASSETS.fetch(request);
        if (response.status === 404) {
          // Serve index.html for SPA routes or root route issues
          const indexRequest = new Request(new URL("/index.html", request.url), request);
          response = await env.ASSETS.fetch(indexRequest);
        }
        return response;
      } catch (e) {
        const indexRequest = new Request(new URL("/index.html", request.url), request);
        return await env.ASSETS.fetch(indexRequest);
      }
    }

    return new Response("Assets binding not available", { status: 500 });
  },
};