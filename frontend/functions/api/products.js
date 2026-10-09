export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/products" || url.pathname === "/api/products/") {
      try {
        const { results } = await env.DB.prepare("SELECT * FROM products").all();
        return new Response(JSON.stringify(results), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    // بازگرداندن فایل‌های استاتیک فرانت‌اند برای سایر مسیرها
    return env.ASSETS.fetch(request);
  }
};