const { getUsersWhere, getSortedUsers, getPagination } = require("./conceps/2.filtering.sorting");
const { createPostTable, insert } = require("./conceps/3.relationship");
const { getUsersWithPosts, leftJoin } = require("./conceps/4.joins");
const { countPostsByUser, averagePerUser } = require("./conceps/5.aggregation");
const { createUserTable, insertUser, getUsers, updateUserEmail, deleteUser } = require("./conceps/basic.queries");

// test basic query
async function testBasicQueries(){
    try{
    //  await createUserTable()

    // await insertUser("Ace", "Ace@gmail.com")

    // console.log("all users")
    // const allUsers = await getUsers();
    // console.log(allUsers);

    // const updated = await updateUserEmail("Bell", "Chan@gmail.com");
    // console.log(updated)

    // const deleted = await deleteUser(1)
    // console.log(deleted)

     

    }catch(e){
        console.error("Error ", e)
    }
}

async function testFilterAndSortQueries(){
    try{
        // get users with a username whose username starts with b

        // const filteredUser = await getUsersWhere("username LIKE 'B%' ")
        // console.log(filteredUser)

        // const sortedUsers = await getSortedUsers("created_at", "DESC");
        // console.log(sortedUsers)

        const pagi = await getPagination(2,0);
        console.log(pagi)

    }catch(e){
        console.log("error ", e)
    }
}

async function testRelationshipQ(){
    try{

     //   await createPostTable();

        const res = await insert("The One", "the way of people", 1);
        console.log(res);

    }catch(e){
        console.error("error ", e);
    }
}

async function testJoins(){

    try{

    //   const res = await getUsersWithPosts();
    //   console.log(res);

      const res = await leftJoin();
      console.log(res);

    }catch(e){
        console.error("error ",e)
    }
}

async function testAggregate(){

  try{

    //  const res = await countPostsByUser();
    //  console.log(res);

     const res = await averagePerUser();
     console.log(res);



  }catch(e){
    console.error(e);
  }
}

async function runAllQueries(){

    // await testBasicQueries()

    // await testFilterAndSortQueries()

  //  await testRelationshipQ()

 //     await testJoins()

 await testAggregate()

}

runAllQueries()