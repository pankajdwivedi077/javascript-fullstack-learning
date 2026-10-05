import dns from "node:dns";
import { MongoClient } from "mongodb";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

let client;
let db;

export async function connectMongo(mongoUrl) {
  if (db) return db;

  client = new MongoClient(mongoUrl, {});

  await client.connect();
  db = client.db();
  return db;
}

export function getDb() {
  if (!db) throw new Error("Mongo not connected yet");
  return db;
}

export async function closeMongo() {
  if (client) await client.close();
  client = null;
  db = null;
}
