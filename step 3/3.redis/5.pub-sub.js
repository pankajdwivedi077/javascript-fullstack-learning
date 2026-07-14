// pub/sub

const redis = require("redis");

const client = redis.createClient();

client.on("error", (error)=> {
    console.log("error in redis client ", error);
})

async function redisConnection(){
    try{

      await client.connect();  // publisher
      console.log("redis connected");

      const subscribe = client.duplicate() // create a new element but it shares the same connection
      await subscribe.connect() // connect to redis server | subscriber

      await subscribe.subscribe("dummy-channel", (message, channel) => {
        console.log(`Received message from ${channel} : ${message}`)
      });

      // publish message to the dummy channel
      await client.publish("dummy-channel", "Some dummy data from publisher");

      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      })

      await subscribe.unsubscribe("dummy-channel");
      await subscribe.quit();

      pipelining & transaction

      const multi = await client.multi();

      multi.set("key1", "value1");
      multi.set("key2", "value2");
      multi.get("key1");
      multi.get("key2");

      const results = await multi.exec();
      console.log(results);

      const pipeline = await client.multi(); // creating queue | no need of await here 

      pipeline.set("key1", "value1"); // adding to queue | 
      pipeline.set("key2", "value2");
      pipeline.get("key1");
      pipeline.get("key1");

      const pipelineResults = await pipeline.exec(); // sending all data to server in single operation and get result
      console.log(pipelineResults);

      // transaction ex
      const dummyEx = client.multi();
        dummyEx.decrBy("account:1234:balance", 100);
        dummyEx.incrBy("account:9999:balance", 100);
        const dummyExResult = dummyEx.exec();
        console.log(dummyExResult);

        // delete everything in ALL databases

        // await client.flushAll();

        // // delete everything in current database only
        // await client.flushDb();



    }catch(e){
       console.log("error in redis connection ", e);
    }finally{
        await client.quit();
    }
}

redisConnection();