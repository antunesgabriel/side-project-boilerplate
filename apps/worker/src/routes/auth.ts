import { Hono } from "hono";
import { env } from "hono/adapter";
import { getAuth } from "~/config/auth";
import { getDB } from "~/config/db";

const router = new Hono({
  strict: false,
});

router.on(["POST", "GET"], "/auth/*", (c) => {
  const { BASE_CLIENT_URL } = env<Env>(c);

  console.log(
    "Auth route hit",
    c.req.method,
    c.req.path,
    c.req.header("Origin"),
    BASE_CLIENT_URL
  );

  const db = getDB(c);
  const auth = getAuth(c, db);

  return auth.handler(c.req.raw);
});

export default router;
