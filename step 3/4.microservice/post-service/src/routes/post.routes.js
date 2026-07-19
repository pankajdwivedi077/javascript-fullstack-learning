const express = require("express");
const { createPost, getAllPosts, getPost, deletePost } = require("../controller/post.controller");

const router = express.Router();

// middleware -> this will tell if the user is an auth user or not

router.post("/post", createPost);

module.exports = router;