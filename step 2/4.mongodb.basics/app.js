const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();

const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    isActive: Boolean,
    tags: [String],
    createdAt: {type: Date, default: Date.now}
});

// create user model
const User = mongoose.model('User', userSchema);

async function runQuerExamples(){
    try{

       const conn = await mongoose.connect(uri);
       console.log("db connected ", conn.connection.host)

      // create a new document
      const newUser = await User.create({
        name: "Raj",
        email: "Raj@gmail.com",
        age: 25,
        isActive: true,
        tags: ["Software Engineer", "Developer"],
      })

      console.log("Created new user ", newUser);

    }catch(e){
        console.log('Error ', e);
    }finally{
        await mongoose.connection.close();
    }
}

runQuerExamples()