const logger = require("../utils/logger");
const Search = require("../models/search");

async function handlerPostCreated(event){

    try{

       const newSearchPost = new Search({
         postId: event.postId,
         userId: event.userId,
         content: event.content,
         createdAt: event.createdAt
       })

       await newSearchPost.save();
       logger.info(`Search post created: ${event.postId}, ${newSearchPost._id.toString()}`)

    }catch(e){
        logger.error(e, " error occured in HandlerPostCreated")
    }
}

async function handlerPostDeleted(event){

   try{
     
       await Search.findOneAndDelete({postId: event.postId});
       logger.info(`Search post deleted: ${event.postId} `);

   }catch(e){
      logger.error(e, " error occured in HandlerPostDeleted");
   }

}

module.exports = { handlerPostCreated, handlerPostDeleted }