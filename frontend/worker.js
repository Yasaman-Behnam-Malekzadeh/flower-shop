// =============================================================================
// Helper Functions (Crypto & Responses)
// =============================================================================

async function hashPassword(password) {
  const iterations = 100000;
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const hash = new Uint8Array(
    await crypto.subtle.deriveBits(
      { name: "PBKDF2", hash: "SHA-256", salt, iterations },
      key,
      256
    )
  );
  const toHex = (bytes) =>
    Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");

  return `pbkdf2$${iterations}$${toHex(salt)}$${toHex(hash)}`;
}

async function verifyPassword(password, storedHash) {
  const [algorithm, iterationsText, saltHex, expectedHash] = storedHash.split("$");
  if (algorithm !== "pbkdf2" || !iterationsText || !saltHex || !expectedHash) {
    return false;
  }

  const fromHex = (hex) =>
    new Uint8Array(hex.match(/.{2}/g).map((byte) => parseInt(byte, 16)));
  const salt = fromHex(saltHex);
  const iterations = Number(iterationsText);
  if (!Number.isInteger(iterations) || iterations < 1) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const hash = new Uint8Array(
    await crypto.subtle.deriveBits(
      { name: "PBKDF2", hash: "SHA-256", salt, iterations },
      key,
      256
    )
  );
  const actualHash = Array.from(hash, (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");

  return actualHash === expectedHash;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function jsonResponse(data, status = 200) {
  return Response.json(data, {
    status,
    headers: corsHeaders,
  });
}

// =============================================================================
// Main Worker Fetch Handler
// =============================================================================

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // -------------------------------------------------------------
    // 1. Authentication API Routes
    // -------------------------------------------------------------

    // POST /api/register
    if (url.pathname === "/api/register" && request.method === "POST") {
      try {
        const { email, password, name, phone, address } = await request.json();

        if (!email || !password) {
          return jsonResponse({ error: "Email and password are required." }, 400);
        }

        const normalizedEmail = email.toLowerCase().trim();

        const existingUser = await env.DB.prepare(
          "SELECT id FROM users WHERE email = ?"
        )
          .bind(normalizedEmail)
          .first();

        if (existingUser) {
          return jsonResponse({ error: "An account with this email already exists." }, 409);
        }

        const userId = crypto.randomUUID();
        const passwordHash = await hashPassword(password);

        await env.DB.prepare(
          "INSERT INTO users (id, email, password_hash, name, phone, address) VALUES (?, ?, ?, ?, ?, ?)"
        )
          .bind(
            userId,
            normalizedEmail,
            passwordHash,
            name || "",
            phone || "",
            address || ""
          )
          .run();

        return jsonResponse(
          {
            success: true,
            user: {
              id: userId,
              email: normalizedEmail,
              name: name || "",
              phone: phone || "",
              address: address || "",
            },
            token: `token_${userId}_${Date.now()}`,
          },
          201
        );
      } catch (e) {
        return jsonResponse({ error: e.message || "Failed to register user." }, 500);
      }
    }

    // POST /api/login
    if (url.pathname === "/api/login" && request.method === "POST") {
      try {
        const { email, password } = await request.json();

        if (!email || !password) {
          return jsonResponse({ error: "Email and password are required." }, 400);
        }

        const normalizedEmail = email.toLowerCase().trim();

        const user = await env.DB.prepare(
          "SELECT id, email, password_hash, name, phone, address FROM users WHERE email = ?"
        )
          .bind(normalizedEmail)
          .first();

        const isLegacyPassword =
          user &&
          typeof user.password_hash === "string" &&
          !user.password_hash.startsWith("pbkdf2$") &&
          user.password_hash === password;

        if (
          !user ||
          (!isLegacyPassword && !(await verifyPassword(password, user.password_hash)))
        ) {
          return jsonResponse({ error: "Invalid email or password." }, 401);
        }

        if (isLegacyPassword) {
          await env.DB.prepare(
            "UPDATE users SET password_hash = ? WHERE id = ?"
          )
            .bind(await hashPassword(password), user.id)
            .run();
        }

        return jsonResponse({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            name: user.name || "",
            phone: user.phone || "",
            address: user.address || "",
          },
          token: `token_${user.id}_${Date.now()}`,
        });
      } catch (e) {
        return jsonResponse({ error: e.message || "Failed to log in." }, 500);
      }
    }

    // -------------------------------------------------------------
    // 2. Profile Update Route (PUT /api/profile)
    // -------------------------------------------------------------
    if (url.pathname === "/api/profile" && request.method === "PUT") {
      try {
        const { email, name, phone, address } = await request.json();

        if (!email) {
          return jsonResponse({ error: "Email is required to update profile." }, 400);
        }

        const normalizedEmail = email.toLowerCase().trim();

        await env.DB.prepare(
          "UPDATE users SET name = ?, phone = ?, address = ? WHERE email = ?"
        )
          .bind(name || "", phone || "", address || "", normalizedEmail)
          .run();

        const updatedUser = await env.DB.prepare(
          "SELECT id, email, name, phone, address FROM users WHERE email = ?"
        )
          .bind(normalizedEmail)
          .first();

        return jsonResponse({
          success: true,
          user: updatedUser,
        });
      } catch (e) {
        return jsonResponse({ error: e.message || "Failed to update profile." }, 500);
      }
    }

    // -------------------------------------------------------------
    // 3. AI Florist Advisor Route (POST /api/ai-florist)
    // -------------------------------------------------------------
    if (url.pathname === "/api/ai-florist" && request.method === "POST") {
      try {
        const { prompt } = await request.json();
        if (!prompt) {
          return jsonResponse({ error: "Prompt is required." }, 400);
        }

        if (!env.OPENAI_API_KEY) {
          return jsonResponse({ error: "OpenAI API key not configured on worker." }, 500);
        }

        const { results: availableFlowers } = await env.DB.prepare(
          "SELECT id, name, price, description, image_url FROM products"
        ).all();

        if (!availableFlowers || availableFlowers.length === 0) {
          return jsonResponse({ error: "No flowers available in inventory." }, 400);
        }

        const systemPrompt = `
        You are an expert knitted bouquet designer and helpful assistant for KnitFlora. 
        You speak very friendly and artistically.
        
        CRITICAL SECURITY & TOPIC GUARDRAIL:
        You must ONLY answer questions or prompts related to flowers, knitted bouquets, colors, wrapping paper, ribbons, or gift occasions (such as birthdays, anniversaries, or celebrating a wife/family member). 
        If the user asks about anything unrelated (such as coding, math, general trivia, politics, or unrelated topics), you must IGNORE the request and respond strictly with:
        - title: "Please ask me about which bouquet you would like!"
        - reasoning: "I'm your KnitFlora AI assistant, and I can only help you design and customize your knitted bouquets and greeting cards."
        - recommendedBlooms: []
        - recommendedPaper: "none"
        - recommendedRibbon: "none"
        - greetingCardMessage: ""

        SPECIAL OCCASION INSTRUCTIONS:
        If the user mentions a special occasion like a wife's birthday, anniversary, or romantic milestone:
        1. Select appropriate flowers from the available inventory.
        2. Choose a matching wrapping paper ID ('pastel', 'kraft', 'lavender', or 'white').
        3. Choose a matching ribbon ID ('satin', 'velvet', or 'lace').
        4. Write a sweet, romantic, personalized greeting card message suitable for the occasion.

        CRITICAL INVENTORY CONSTRAINT: 
        You must ONLY recommend flower IDs and items present in our AVAILABLE INVENTORY provided below. 
        Do NOT invent or suggest any items not present in this list.

        AVAILABLE INVENTORY:
        ${JSON.stringify(availableFlowers, null, 2)}

        You must respond strictly in valid JSON format with the following keys:
        - 'title' (string): Creative bouquet name.
        - 'reasoning' (string): Friendly explanation of why this fits the occasion.
        - 'recommendedBlooms' (list of objects): Each object must include 'id', 'name', 'image' (use image_url value), and 'quantity' (integer).
        - 'recommendedPaper' (string): Must be one of the exact paper IDs if possible ('pastel', 'kraft', 'lavender', 'white', or 'none').
        - 'recommendedRibbon' (string): Must be one of the exact ribbon IDs if possible ('satin', 'velvet', 'lace', or 'none').
        - 'greetingCardMessage' (string): A sweet, heartfelt message written for the greeting card (or empty string if not applicable).
        `;

        const openAiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" }
          })
        });

        if (!openAiRes.ok) {
          const errData = await openAiRes.text();
          throw new Error(`OpenAI API error: ${errData}`);
        }

        const aiData = await openAiRes.json();
        const content = JSON.parse(aiData.choices[0].message.content);
        return jsonResponse(content);
      } catch (e) {
        return jsonResponse({ error: e.message || "Failed to generate AI recommendation." }, 500);
      }
    }

    // -------------------------------------------------------------
    // 4. Product & Flower API Routes
    // -------------------------------------------------------------
    if (
      url.pathname === "/api/products" ||
      url.pathname === "/products" ||
      url.pathname.startsWith("/api/products") ||
      url.pathname.startsWith("/api/bouquets") ||
      url.pathname === "/api/flowers" ||
      url.pathname.startsWith("/api/flowers")
    ) {
      try {
        const { results } = await env.DB.prepare("SELECT * FROM products").all();
        const mapped = (results || []).map((item) => ({
          ...item,
          image: item.image_url || item.image || "",
          selling_price: item.price || item.selling_price || 0,
        }));
        return jsonResponse(mapped);
      } catch (e) {
        return jsonResponse({ error: e.message }, 500);
      }
    }

    // -------------------------------------------------------------
    // 5. Papers API Route
    // -------------------------------------------------------------
    if (url.pathname === "/api/papers" || url.pathname.startsWith("/api/papers")) {
      try {
        const { results } = await env.DB.prepare("SELECT * FROM papers").all();
        return jsonResponse(results || []);
      } catch (e) {
        return jsonResponse({ error: e.message }, 500);
      }
    }

    // -------------------------------------------------------------
    // 6. Ribbons API Route
    // -------------------------------------------------------------
    if (url.pathname === "/api/ribbons" || url.pathname.startsWith("/api/ribbons")) {
      try {
        const { results } = await env.DB.prepare("SELECT * FROM ribbons").all();
        return jsonResponse(results || []);
      } catch (e) {
        return jsonResponse({ error: e.message }, 500);
      }
    }

    // -------------------------------------------------------------
    // 7. Fallback to static assets for React client-side routing
    // -------------------------------------------------------------
    try {
      let response = await env.ASSETS.fetch(request);
      if (response.status === 404 && !url.pathname.includes(".")) {
        return await env.ASSETS.fetch(
          new Request(`${url.origin}/index.html`, request)
        );
      }
      return response;
    } catch (e) {
      return new Response("An error occurred.", { status: 500 });
    }
  },
};