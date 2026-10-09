export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/products") {
      try {
        const { results } = await env.DB.prepare("SELECT * FROM products").all();
        return Response.json(results);
      } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
      }
    }

    // برای سایر مسیرها، فایل‌های فرانت‌اند سرو می‌شوند
    return env.ASSETS.fetch(request);
  }
};