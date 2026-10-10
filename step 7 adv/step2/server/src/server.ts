import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.ts"

const app = express();

// allowlist
app.use(cors({
  origin(origin, callback){
   if (!origin){
      return callback(null, true)
    }
    if(process.env.CORS_ALLOWED_ORIGIN?.includes(origin)){
      return callback(null, true)
    }
  },
  credentials: true
}));

// INTENTIONALLY SIMPLE / INSECURE:
// open JSON parsing with no limits yet
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    message: "Server is running",
  });
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server start failed", error);
    process.exit(1);
  }
}

startServer();
