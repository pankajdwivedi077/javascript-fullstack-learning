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

       await client.ZADD("cart", [{
        score: 100,
        value: "Cart 1"
       },{
        score: 150,
        value: "Cart 2"
       },{
        score: 50,
        value: "Cart 3"
       }]);

       const getTopCartItems = await client.zRange("cart", 0, -1);
       console.log(getTopCartItems);

       const extractAllCaerItems = await client.zRangeByScore("cart", 0, -1);
       console.log(extractAllCaerItems);

       const cartTwoRank = await client.zRank("cart", "Cart 2");
       console.log(cartTwoRank);

       // hashes -> Hset, Hget, HgetAll, Hdelete

       await client.hSet("product", 
        {name: "product 1", rating: "5"}
    );

    const getProductRating = await client.hGet("product", "name");
    console.log(getProductRating);

    const getProductDetails = await client.hGetAll("product");
    console.log(getProductDetails);

    await client.hDel("product", "rating");
    const updatedProductDetails = await client.hGet("product");
    console.log(updatedProductDetails);

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