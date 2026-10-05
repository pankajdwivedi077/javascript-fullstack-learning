import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import mongoose from "mongoose";

export async function connectToDb(){
    try {
      const uri = process.env.MONGO_URI;
       if (!uri) {
      throw new Error("MONGO_URI is not defined");
    }
     await mongoose.connect(uri);
   
    console.log("MongoDB connected");
    } catch (error) {
        console.error('Mongodb connection error ', error);
        process.exit(1)
    }
}