import express from "express";
import { add, deleteById } from "../controller/authorController";

const router = express.Router();

router.post("/authors", add);
router.delete("/authors/:id", deleteById);

export default router;