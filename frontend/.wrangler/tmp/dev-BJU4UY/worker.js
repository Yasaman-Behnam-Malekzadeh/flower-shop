var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker.js
async function hashPassword(password) {
  const iterations = 1e5;
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
  const toHex = /* @__PURE__ */ __name((bytes) => Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(""), "toHex");
  return `pbkdf2$${iterations}$${toHex(salt)}$${toHex(hash)}`;
}
__name(hashPassword, "hashPassword");
async function verifyPassword(password, storedHash) {
  const [algorithm, iterationsText, saltHex, expectedHash] = storedHash.split("$");
  if (algorithm !== "pbkdf2" || !iterationsText || !saltHex || !expectedHash) {
    return false;
  }
  const fromHex = /* @__PURE__ */ __name((hex) => new Uint8Array(hex.match(/.{2}/g).map((byte) => parseInt(byte, 16))), "fromHex");
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
  const actualHash = Array.from(
    hash,
    (byte) => byte.toString(16).padStart(2, "0")
  ).join("");
  return actualHash === expectedHash;
}
__name(verifyPassword, "verifyPassword");
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};
function jsonResponse(data, status = 200) {
  return Response.json(data, {
    status,
    headers: corsHeaders
  });
}
__name(jsonResponse, "jsonResponse");
var worker = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }
    if (url.pathname === "/api/register" && request.method === "POST") {
      try {
        const { email, password, name } = await request.json();
        if (!email || !password) {
          return jsonResponse({ error: "Email and password are required." }, 400);
        }
        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await env.DB.prepare(
          "SELECT id FROM users WHERE email = ?"
        ).bind(normalizedEmail).first();
        if (existingUser) {
          return jsonResponse({ error: "An account with this email already exists." }, 409);
        }
        const userId = crypto.randomUUID();
        const passwordHash = await hashPassword(password);
        await env.DB.prepare(
          "INSERT INTO users (id, email, password_hash, name) VALUES (?, ?, ?, ?)"
        ).bind(userId, normalizedEmail, passwordHash, name || "").run();
        return jsonResponse(
          {
            success: true,
            user: {
              id: userId,
              email: normalizedEmail,
              name: name || ""
            },
            token: `token_${userId}_${Date.now()}`
          },
          201
        );
      } catch (e) {
        return jsonResponse({ error: e.message || "Failed to register user." }, 500);
      }
    }
    if (url.pathname === "/api/login" && request.method === "POST") {
      try {
        const { email, password } = await request.json();
        if (!email || !password) {
          return jsonResponse({ error: "Email and password are required." }, 400);
        }
        const normalizedEmail = email.toLowerCase().trim();
        const user = await env.DB.prepare(
          "SELECT id, email, password_hash, name FROM users WHERE email = ?"
        ).bind(normalizedEmail).first();
        const isLegacyPassword = user && typeof user.password_hash === "string" && !user.password_hash.startsWith("pbkdf2$") && user.password_hash === password;
        if (!user || !isLegacyPassword && !await verifyPassword(password, user.password_hash)) {
          return jsonResponse({ error: "Invalid email or password." }, 401);
        }
        if (isLegacyPassword) {
          await env.DB.prepare(
            "UPDATE users SET password_hash = ? WHERE id = ?"
          ).bind(await hashPassword(password), user.id).run();
        }
        return jsonResponse({
          success: true,
          user: { id: user.id, email: user.email, name: user.name },
          token: `token_${user.id}_${Date.now()}`
        });
      } catch (e) {
        return jsonResponse({ error: e.message || "Failed to log in." }, 500);
      }
    }
    if (url.pathname.startsWith("/api/products") || url.pathname.startsWith("/api/bouquets")) {
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
  }
};
var worker_default = worker;

// ../../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    const body = JSON.stringify(error);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-Ic8lW6/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// ../../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-Ic8lW6/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker2) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker2;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker2.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker2.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker2,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker2.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker2.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=worker.js.map
