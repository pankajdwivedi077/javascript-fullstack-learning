// delete everything in ALL databases
await client.flushAll();

// delete everything in current database only
await client.flushDb();