export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Add CORS headers so your frontend can communicate smoothly during development
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    // Handle CORS preflight OPTIONS request
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // -------------------------------------------------------------
    // 1. Authentication API Routes
    // -------------------------------------------------------------

    // POST /api/register
    if (url.pathname === "/api/register" && request.method === "POST") {
      try {
        const { email, password, name } = await request.json();

        if (!email || !password) {
          return Response.json(
            { error: "Email and password are required." },
            { status: 400, headers: corsHeaders }
          );
        }

        // Check if user already exists
        const existingUser = await env.DB.prepare(
          "SELECT id FROM users WHERE email = ?"
        ).bind(email.toLowerCase().trim()).first();

        if (existingUser) {
          return Response.json(
            { error: "An account with this email already exists." },
            { status: 409, headers: corsHeaders }
          );
        }

        const userId = crypto.randomUUID();

        // Insert new user into D1 database
        await env.DB.prepare(
          "INSERT INTO users (id, email, password_hash, name) VALUES (?, ?, ?, ?)"
        ).bind(userId, email.toLowerCase().trim(), password, name || "").run();

        return Response.json(
          {
            success: true,
            user: { id: userId, email: email.toLowerCase().trim(), name: name || "" },
            token: `token_${userId}_${Date.now()}`
          },
          { status: 201, headers: corsHeaders }
        );
      } catch (e) {
        return Response.json(
          { error: e.message || "Failed to register user." },
          { status: 500, headers: corsHeaders }
        );
      }
    }

    // POST /api/login
    if (url.pathname === "/api/login" && request.method === "POST") {
      try {
        const { email, password } = await request.json();

        if (!email || !password) {
          return Response.json(
            { error: "Email and password are required." },
            { status: 400, headers: corsHeaders }
          );
        }

        // Fetch user from D1 database
        const user = await env.DB.prepare(
          "SELECT id, email, password_hash, name FROM users WHERE email = ?"
        ).bind(email.toLowerCase().trim()).first();

        if (!user || user.password_hash !== password) {
          return Response.json(
            { error: "Invalid email or password." },
            { status: 401, headers: corsHeaders }
          );
        }

        return Response.json(
          {
            success: true,
            user: { id: user.id, email: user.email, name: user.name },
            token: `token_${user.id}_${Date.now()}`
          },
          { status: 200, headers: corsHeaders }
        );
      } catch (e) {
        return Response.json(
          { error: e.message || "Failed to log in." },
          { status: 500, headers: corsHeaders }
        );
      }
    }

    // -------------------------------------------------------------
    // 2. Existing Product & Flower API Routes
    // -------------------------------------------------------------
    if (url.pathname.startsWith("/api/products") || url.pathname.startsWith("/api/bouquets")) {
      try {
        const { results } = await env.DB.prepare("SELECT * FROM products").all();
        return Response.json(results, { headers: corsHeaders });
      } catch (e) {
        return Response.json({ error: e.message }, { status: 500, headers: corsHeaders });
      }
    }

    if (url.pathname.startsWith("/api/flowers")) {
      try {
        const { results } = await env.DB.prepare("SELECT * FROM flowers").all();
        return Response.json(results, { headers: corsHeaders });
      } catch (e) {
        return Response.json({ error: e.message }, { status: 500, headers: corsHeaders });
      }
    }

    // -------------------------------------------------------------
    // 3. Fallback to static assets for React routing
    // -------------------------------------------------------------
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