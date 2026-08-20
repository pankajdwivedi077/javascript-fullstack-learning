import { Hono } from 'hono';
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { initDatabase } from "./database/db";

const app = new Hono();
const db = initDatabase();

app.use("*", cors());
app.use("*", logger());

app.get('/', (c) => {
  return c.text('Hello Hono!');
})

app.get("/db-test", (c)=> {
  const result = db.query(`SELECT sqlite_version()`).get()
  return c.json({
    message: "db connected successfully",
    sqlite_version : result
  })
})

export default app;
