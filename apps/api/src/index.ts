import { Hono } from "hono";
import { cors } from "hono/cors";

import authRoute from "~/routes/auth";

const app = new Hono();

app.use(
  cors({
    origin: process.env.BASE_CLIENT_URL!,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/", authRoute);

export default app;
