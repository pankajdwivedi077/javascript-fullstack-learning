const redis = require("redis");

const client =  redis.createClient();

// event lisener
client.on("error", (error) => {
    console.log("redis client error ", error);
})

async function testRedis(){
    try{

       await client.connect();
       console.log("connected to redis");

      await client.set("name", "bell");  // set the key and  value

       const extractValue = await client.get("name");  // get from key
       console.log(extractValue);

       const deleteCount = await client.del("name");
       console.log(deleteCount);

       await client.set("count", 100);
       const incrementCount = await client.incr("count");
       console.log(incrementCount);

       
       const decremetCount = await client.decr("count");
       console.log(decremetCount);

        delete1 = await client.del("count");
        console.log(delete1);

        // delete everything in ALL databases

        // await client.flushAll();

        // // delete everything in current database only
        // await client.flushDb();

    }catch(e){
        console.log(e);
    }finally{
        await client.quit();
    }
}

testRedis();