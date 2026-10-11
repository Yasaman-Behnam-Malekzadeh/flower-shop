export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle API requests
    if (url.pathname.startsWith('/api/products')) {
      try {
        const { results } = await env.DB.prepare("SELECT * FROM products").all();
        return Response.json(results);
      } catch (err) {
        return new Response(err.message, { status: 500 });
      }
    }

    // Serve static frontend assets (HTML, JS, CSS, images) for all other routes
    return env.ASSETS.fetch(request);
  },
};
