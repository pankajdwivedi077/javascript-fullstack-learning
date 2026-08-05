const { createUserTable } = require("./conceps/basic.queries");

// test basic query
async function testBasicQueries(){
    try{
      await createUserTable()
    }catch(e){
        console.error("Error ", e)
    }
}

async function runAllQueries(){
    await testBasicQueries()
}

runAllQueries()