// =============================================================================
// Helper Functions (Crypto & Responses)
// =============================================================================

// PBKDF2 Password Hashing
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

// PBKDF2 Password Verification
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

// Standard CORS Headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Helper to return standardized JSON responses with CORS headers
function jsonResponse(data, status = 200) {
  return Response.json(data, {
    status,
    headers: corsHeaders,
  });
}

// =============================================================================
// Main Worker Fetch Handler
// =============================================================================

const worker = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Handle CORS preflight OPTIONS request
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // -------------------------------------------------------------
    // 2. Authentication API Routes
    // -------------------------------------------------------------

    // POST /api/register
    if (url.pathname === "/api/register" && request.method === "POST") {
      try {
        const { email, password, name } = await request.json();

        if (!email || !password) {
          return jsonResponse({ error: "Email and password are required." }, 400);
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Check if user already exists
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

        // Insert new user into D1 database
        await env.DB.prepare(
          "INSERT INTO users (id, email, password_hash, name) VALUES (?, ?, ?, ?)"
        )
          .bind(userId, normalizedEmail, passwordHash, name || "")
          .run();

        return jsonResponse(
          {
            success: true,
            user: {
              id: userId,
              email: normalizedEmail,
              name: name || "",
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

        // Fetch user from D1 database
        const user = await env.DB.prepare(
          "SELECT id, email, password_hash, name FROM users WHERE email = ?"
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

        // Auto-upgrade accounts created before PBKDF2 salted password hashes were implemented
        if (isLegacyPassword) {
          await env.DB.prepare(
            "UPDATE users SET password_hash = ? WHERE id = ?"
          )
            .bind(await hashPassword(password), user.id)
            .run();
        }

        return jsonResponse({
          success: true,
          user: { id: user.id, email: user.email, name: user.name },
          token: `token_${user.id}_${Date.now()}`,
        });
      } catch (e) {
        return jsonResponse({ error: e.message || "Failed to log in." }, 500);
      }
    }

    // -------------------------------------------------------------
    // 3. Product & Flower API Routes
    // -------------------------------------------------------------
    if (
      url.pathname.startsWith("/api/products") ||
      url.pathname.startsWith("/api/bouquets")
    ) {
      try {
        const { results } = await env.DB.prepare("SELECT * FROM products").all();
        return jsonResponse(results);
      } catch (e) {
        return jsonResponse({ error: e.message }, 500);
      }
    }

    if (url.pathname.startsWith("/api/flowers")) {
      try {
        const { results } = await env.DB.prepare("SELECT * FROM flowers").all();
        return jsonResponse(results);
      } catch (e) {
        return jsonResponse({ error: e.message }, 500);
      }
    }

    // -------------------------------------------------------------
    // 4. Fallback to static assets for React client-side routing
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

export default worker;