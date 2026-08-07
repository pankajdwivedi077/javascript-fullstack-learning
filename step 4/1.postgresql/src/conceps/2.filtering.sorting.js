const db = require("../db/db");

// where clause 

async function getUsersWhere(condintion){
    const getUsersQuery = `
     SELECT * FROM users
     WHERE ${condintion}
    `
    try{
      const res = await db.query(getUsersQuery)
      return res.rows;
    }catch(e){
        console.error(e)
    }
}

async function getSortedUsers(column, order="ASC"){
  const getSortedUsersQuery = `
   SELECT * FROM users
   ORDER BY ${column} ${order}
  `
  try{
   const res = await db.query(getSortedUsersQuery)
   return res.rows;
  }catch(e){
      console.error(e)
  }
}

async function getPagination(limit, offset){
    const query = `
     SELECT * FROM users
     LIMIT $1 OFFSET $2
    `
  try{
    const res = await db.query(query,[limit, offset])
    return res.rows
  }catch(e){
    console.error(e)
  }
}

module.exports = { getUsersWhere, getSortedUsers, getPagination }