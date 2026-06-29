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
    //   const newUser = await User.create({
    //     name: "John",
    //     email: "John@gmail.com",
    //     age: 27,
    //     isActive: false,
    //     tags: ["Software Engineer", "Developer"],
    //   })

    //   console.log("Created new user ", newUser);

    //   const allUsers = await User.find({})
    //   console.log(allUsers)

    // const getUsersOfActiveFalse = await User.find({isActive: false});
    // console.log(getUsersOfActiveFalse);

    // const getUser = await User.findOne({ name: "John" })
    // console.log(getUser)

    // const getUserById = await User.findById("6a3f927a9d56dc3fe16a77f5")
    // console.log(getUserById)

    // const selectedFields = await User.find().select("name email -_id");
    // console.log(selectedFields)

    // const limitedUser = await User.find().limit(5).skip(1);
    // console.log(limitedUser)

    // const sortedUsers = await User.find().sort({ age: -1 })
    // console.log(sortedUsers)

    // const countDocument = await User.countDocuments({ isActive: false });
    // console.log(countDocument)

    // const deleteUser = await User.findByIdAndDelete("6a3f927a9d56dc3fe16a77f5")
    // console.log(deleteUser)

    // const updateUser = await  User.findByIdAndUpdate("6a3f927a9d56dc3fe16a77f5", {
    //     $set: {age: 28}, $push: {tags: 'updated'}, 
        
    // }, { new: true });

    // console.log(updateUser)


    }catch(e){
        console.log('Error ', e);
    }finally{
        await mongoose.connection.close();
    }
}

runQuerExamples()