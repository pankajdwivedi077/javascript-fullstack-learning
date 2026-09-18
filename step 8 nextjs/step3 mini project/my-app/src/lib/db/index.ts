import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from "pg";
import * as schema from "./schema";
import { usersRelations } from "./schema"

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? {
        rejectUnauthorized:false
    }:false,
    max: 10
})

export const db = drizzle({
    client: pool,        
    relations: usersRelations,
});

export async function getClient(){
    const client = await pool.connect();
    return client;
}
// const db = drizzle(process.env.DATABASE_URL!);