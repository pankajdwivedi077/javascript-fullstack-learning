const express = require("express");
const { createPost, getAllPosts, getPost, deletePost } = require("../controller/post.controller");
const { authenticateRequest } = require("../middleware/auth.middleware");

const router = express.Router();

// middleware -> this will tell if the user is an auth user or not

router.use(authenticateRequest);

router.post("/create", createPost);
router.get("/allposts", getAllPosts);

module.exports = router;