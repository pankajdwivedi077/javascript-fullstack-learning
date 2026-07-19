const Post = require("../models/post");
const logger = require("../utils/logger");

const createPost = async(req,res)=> {

     logger.info("createPost endPoint hit");

    try{

      const { content, mediaUrls } = req.body;

      const newlyPost = new Post({
        user: req.user.userId,
        content,
        mediaUrls: mediaUrls || []
      })

      await newlyPost.save();

      logger.info("post created successfully ", newlyPost);

      res.status(201).json({
        success: true,
        message: "Post created successfully"
      })

    }catch(e){
        logger.error("Error creating post ", e);
        res.status(500).json({
            success: false,
            message: "Internal server Error on creating post"
        })
    }
}

const getAllPosts = async(req,res)=> {

     

    try{

      

    }catch(e){
        logger.error("Error fetching posts ", e);
        res.status(500).json({
            success: false,
            message: "Internal server Error on getAllPosts"
        })
    }
}

const getPost = async(req,res)=> {

     

    try{

      

    }catch(e){
        logger.error("Error fetching post ", e);
        res.status(500).json({
            success: false,
            message: "Internal server Error on getAllPost"
        })
    }
}

const deletePost = async(req,res)=> {

     

    try{

      

    }catch(e){
        logger.error("Error deleting post ", e);
        res.status(500).json({
            success: false,
            message: "Internal server Error on deletePost"
        })
    }
}

module.exports = { 
    createPost,
    getAllPosts,
    getPost,
    deletePost
}