const db = require("../db/db");

async function countPostsByUser(){

    const query = `
    SELECT users.username, COUNT(posts.id) as post_count
    FROM users
    LEFT JOIN posts ON users.id = posts.user_id
    GROUP BY users.id, users.username
    `

    try{
      const res = await db.query(query);
      return res.rows;
    }catch(e){
        console.error("error in countPostsByUser ", e);
    }

}

async function averagePerUser(){
    const query = `
    SELECT AVG(post_count) as average_posts
    FROM(
     SELECT COUNT(posts.id) as post_count
     FROM users
     LEFT JOIN posts ON users.id = posts.user_id
     GROUP BY users.id
    ) as user_per_counts
    `
    try{
        const res = await db.query(query);
        return res.rows;
    }catch(e){ 
         console.error("error in average", e);
    }
}

module.exports = { countPostsByUser, averagePerUser };