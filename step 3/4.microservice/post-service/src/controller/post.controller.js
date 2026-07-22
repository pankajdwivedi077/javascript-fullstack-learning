const Post = require("../models/post");
const logger = require("../utils/logger");

async function invalidatePostCache(req, input){
    const keys = await req.redisClient.keys("posts:*");
    if(keys.length > 0){
        await req.redisClient.del(keys)
    }
}

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

      await invalidatePostCache(req, newlyPost._id.toString());

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

    logger.info("getAllPosts endPoint hit");

    try{

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const startIndex = (page -1) * limit;

      const cacheKey = `posts:${page}:${limit}`;
      const cachedPosts = await req.redisClient.get(cacheKey);
      
      if(cachedPosts){
        return res.status(200).json({
            success: true,
            data: JSON.parse(cachedPosts)
        })
      }

      const posts = await Post.find({}).sort({createdAt: -1}).skip(startIndex).limit(limit);

      const total = await Post.countDocuments();

      const result = {
        posts,
        currentPage: page,
        totalPage: Math.ceil(total/limit),
        totalPosts: total

      }

      // save your posts in redis cache
      await req.redisClient.setex(
        cacheKey,
        300,
        JSON.stringify(result)
      )

      res.staus(200).json({
        success: true,
        data: result
      })

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