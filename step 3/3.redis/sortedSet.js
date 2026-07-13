// same as set just each element has a score associated with it. redis maintain order of element based on score and that will make idle of things like learderboard, priority queue

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

       // ZAdd, ZRange, ZRank, ZRem

    }catch(e){
        console.log(e);
    }finally{
        await client.quit();
    }
}

testRedis();