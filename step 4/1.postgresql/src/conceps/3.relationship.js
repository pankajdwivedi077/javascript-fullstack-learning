const db =  require("../db/db");

async function createPostTable(){
    const createTable = `
       CREATE TABLE IF NOT EXISTS posts(
         id SERIAL PRIMARY KEY,
         title VARCHAR(50) NOT NULL,
         content TEXT,
         user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

       )   
    `
    try {
        const res = await db.query(createTable);
        console.log("table created")
    } catch (error) {
        console.log("error creating post table ", error);
    }
}

async function insert(title, content, userId){
  const queryInsert = `
   INSERT INTO posts(title, content, user_id)
   VALUES ($1, $2, $3)
   RETURNING * 
  `
  try{
    const res = await db.query(queryInsert,[title, content, userId]);
    return res.rows[0];
  }catch(e){
    console.log("error in insert ", e);
  }
}

module.exports = { createPostTable, insert }