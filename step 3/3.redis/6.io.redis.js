const Redis = require("ioredis"); // redis client library for node.js

const redis = new Redis();

async function ioRedis(){
    try{

        // await redis.set("key", "value");
        // const val = await redis.get("key");
        // console.log(val);

        // delete everything in ALL databases

        await redis.flushall(); 

        // delete everything in current database only
        await redis.flushdb();


    }catch(e){
       console.log("error ", e)
    }finally{
        redis.quit();
    }
}

ioRedis();