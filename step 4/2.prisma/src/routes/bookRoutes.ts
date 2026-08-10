import express from "express";
import { add, get, getById, updateById, deleteById } from "../controller/bookController";

const router = express.Router();

router.post("/books", add);
router.get("/books", get);
router.get("/books/:id", getById);
router.put("/books/:id", updateById);
router.delete("/books/:id", deleteById);

export default router;