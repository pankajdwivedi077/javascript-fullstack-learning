import "dotenv/config";
import express from "express";
import authorRoutes from "./routes/authorRoutes"
import bookRoutes from "./routes/bookRoutes"

const app = express();

app.use(express.json());

app.use("/api", authorRoutes);
app.use("/api", bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})