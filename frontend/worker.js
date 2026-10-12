export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Handle API requests from React frontend
    if (url.pathname.startsWith("/api/products") || url.pathname.startsWith("/api/bouquets")) {
      try {
        const { results } = await env.DB.prepare("SELECT * FROM products").all();
        return Response.json(results);
      } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
      }
    }

    if (url.pathname.startsWith("/api/flowers")) {
      try {
        const { results } = await env.DB.prepare("SELECT * FROM flowers").all();
        return Response.json(results);
      } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
      }
    }

    // 2. Fallback to static assets for React routing
    try {
      let response = await env.ASSETS.fetch(request);
      if (response.status === 404 && !url.pathname.includes(".")) {
        return await env.ASSETS.fetch(new Request(`${url.origin}/index.html`, request));
      }
      return response;
    } catch (e) {
      return new Response("An error occurred.", { status: 500 });
    }
  },
};