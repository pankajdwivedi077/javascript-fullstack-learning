const redis = require("redis");

const client =  redis.createClient();

// event lisener
client.on("error", (error) => {
    console.log("redis client error ", error);
})

async function redisDataStrcuture(){
    try{
       
        await client.connect();
        console.log("redis connected");

        // string
        await client.set("user", "pankaj");
        const name = await client.get("user");
        console.log(name);

        await client.mSet(["user1", "bete", "user2", "aiz"]); // set multiple key value pair with mSet and get multiple with mGet
        const users = await client.mGet(["user1", "user2"]); // return as array destrcuture them
        // const [user1, user2] = users;
        // console.log(user1)
        // console.log(user2)
        console.log(users)

        // list -> LPush, RPush, LRange, LPop, RPop
        await client.lPush("notes", ["note1", "note2", "note3"]);
        const extractAllNotes = await client.lRange("notes", 0, -1) // get all members of list
        console.log(extractAllNotes);

        const firstNote = await client.lPop("notes");
        console.log(firstNote);

        const remainingNotes = await client.lRange("notes", 0, -1);
        console.log(remainingNotes);

        // set -> SAdd, SMembers, SIsMember, SRem

        await client.SADD("fruits", "banaa");
        await client.SADD("fruits", "mango");
        const fruitsUsers = await client.sMembers("fruits");
        console.log(fruitsUsers)

        await client.SADD("color", ["red", "blue", "green"]); // adding multiple value at same time
        const colorSet = await client.SMEMBERS("color");
        console.log(colorSet)

        const redIsPresent = await client.sIsMember("color", "red");
        console.log(redIsPresent)

        const removeRed = await client.sRem("color", "red");
        console.log(removeRed)

        const updatedFruits = await client.sMembers("color")
        console.log(updatedFruits)

        const count = await client.sCard("fruits");
        console.log(count); 

             // set operations
        await client.sAdd("set1", ["a", "b", "c"]);
        await client.sAdd("set2", ["b", "c", "d"]);

        // sUnion — combine both sets (no duplicates)
        const union = await client.sUnion(["set1", "set2"]);
        console.log(union); // [ 'a', 'b', 'c', 'd' ]

        // sInter — only values present in BOTH sets
        const inter = await client.sInter(["set1", "set2"]);
        console.log(inter); // [ 'b', 'c' ]

        // sDiff — values in set1 but NOT in set2
        const diff = await client.sDiff(["set1", "set2"]);
        console.log(diff); // [ 'a' ]

        // delete everything in ALL databases

        // await client.flushAll();

        // // delete everything in current database only
        // await client.flushDb();


    }catch(error){
        console.log("error in redis const ", error);
    }finally{
      await client.quit();
    }
}

redisDataStrcuture();