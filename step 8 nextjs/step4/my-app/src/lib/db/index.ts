import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { authRelations } from "./schema";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: false,
  max: 10,
});

export const db = drizzle({ client: pool, relations: authRelations });

export async function getClient() {
  const client = await pool.connect();
  return client;
}