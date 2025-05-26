import { Hono } from "hono";
import { cors } from "hono/cors";
import { env } from "hono/adapter";

import authRoute from "~/routes/auth";

const app = new Hono();

app.use("*", async (c, next) => {
  const { BASE_CLIENT_URL } = env<Env>(c);

  const corsMiddleware = cors({
    origin: BASE_CLIENT_URL,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  });

  return corsMiddleware(c, next);
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/", authRoute);

export default app;
