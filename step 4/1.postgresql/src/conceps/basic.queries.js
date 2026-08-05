const db = require("../db/db");

async function createUserTable(){
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users(
     id SERIAL PRIMARY KEY,
     username VARCHAR(50) UNIQUE NOT NULL,
     email VARCHAR(50) UNIQUE NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )`

    try{
      await db.query(createTableQuery)
      console.log("users table created")
    }catch(e){
      console.error("error while creating user table")
    }
}

module.exports = { createUserTable };