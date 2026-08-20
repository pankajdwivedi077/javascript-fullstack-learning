import { Database } from "bun:sqlite"

async function sqliteDemo(){

  const db = new Database("bundb.sqlite");

  // create a table
  db.run(`
     CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
     )
    `);

    console.log("tables users created");

    const insertUser = db.prepare(`INSERT INTO users (name, email) VALUES (?, ?)`); // ? / question mark prevent sql injection

    // insertUser.run("pankaj", "pankaj@gmail.com");
    // insertUser.run("lalu", "lalu@gmail.com");

    // const extractAllUsers = db.query(`SELECT * FROM users`).all();
    // console.log(extractAllUsers);

    // db.run(`UPDATE users SET name = ? WHERE id = ?`, ["Lalu Yadav", 2]);
    // const getUpdatedUserInfo = db.query(`SELECT * FROM users WHERE id = ?`).get(2);
    // console.log(getUpdatedUserInfo);

  //  db.run(`DELETE FROM users WHERE id= ?`, [2]);
  //  const extractRemainingUsers = db.query(`SELECT * FROM users`).all();
  //  console.log(extractRemainingUsers);

}

sqliteDemo();