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

// prevent sql injection by ($)
async function insertUser(username, email){
  const insertUserQuery = `
  INSERT INTO users (username, email)
  VALUES ($1, $2)
  RETURNING *
   `
  try{
   const res = await db.query(insertUserQuery, [username, email])
   console.log("user inserted successfully", res.rows[0]);
   return res.rows[0];
  }catch(e){
      console.error("error while creating user table ", e)
  }
 
}
 
async function getUsers(){
   const getAllUsers = `SELECT * FROM users`;
   try{
    const res = await db.query(getAllUsers)
    console.log('fetched all users')
    return res.rows;
   }catch(e){
        console.error("error while creating user table ", e)
   }
}

async function updateUserEmail(username, email){

  const updateQuery = `
   UPDATE users
   SET email = $2
   WHERE username = $1
   RETURNING *
  `
  
   try{
     const res = await db.query(updateQuery, [username, email]);
     if(res.rows.length > 0){
      console.log("user updated successfully")
      return res.rows[0]
     }else{
      console.log("no user found")
      return null;
     }
   
   }catch(e){
       console.error("error while creating user table ", e)
   }
}

async function deleteUser(id){
  const deletedQuery = `
   DELETE FROM users
   WHERE id = $1
   RETURNING *
  `
  try{
      const res = await db.query(deleteUser, [id])
      if(res.rows.length > 0){
        console.log("user deleted successfully")
      }else{
        console.log("no user found")
      }
  }catch(e){
    console.error("error while creating user table ", e)
  }
}

module.exports = { createUserTable, insertUser, getUsers, updateUserEmail, deleteUser };