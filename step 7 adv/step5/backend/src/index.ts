import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { recommendRouter } from "./routes/recommended.routes";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/health", (req: Request, res: Response)=>{
  res.json({status:"ok"})
})

app.use("/api/recommend", recommendRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is running 🚀" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});