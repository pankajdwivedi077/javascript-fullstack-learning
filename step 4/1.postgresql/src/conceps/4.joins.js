const db = require("../db/db");

async function getUsersWithPosts(){

    const getUsersWithPostsQuery = `
     SELECT users.id, users.username, posts.title
     FROM users
     INNER JOIN posts ON users.id = posts.user_id
    `

    try{
       const res = await db.query(getUsersWithPostsQuery);
       return res.rows;
    }catch(e){
        console.error("error in getUsersWithPosts ", e);
    }
}

async function leftJoin(){

   const query = `
      SELECT users.id, users.username, posts.title
      FROM users
      LEFT JOIN posts ON users.id = posts.user_id
   `

   try{
      const res = await db.query(query);
      return res.rows;
   }catch(e){
     console.error("error in leftJoin ", e);
   }
}

module.exports = { getUsersWithPosts, leftJoin };