const { createUserTable, insertUser, getUsers, updateUserEmail, deleteUser } = require("./conceps/basic.queries");

// test basic query
async function testBasicQueries(){
    try{
    //  await createUserTable()

    // await insertUser("Bell", "Bell@gmail.com")

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

async function runAllQueries(){
    await testBasicQueries()
}

runAllQueries()