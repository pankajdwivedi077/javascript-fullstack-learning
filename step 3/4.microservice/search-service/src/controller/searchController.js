const Search = require("../models/search");
const logger = require("../utils/logger");
const { consumeEvent } = require("../utils/rabbitmq");

const searchPostController = async(req,res)=>{
    logger.info("search endpoint hit");
    try{

       const {query} = req.query;

       const results = await Search.find({
        $text: {$search : query}
       },
    {
        score: {$meta: "textScore"}
    }).sort({score: { $meta: "textScore" }}).limit(10)

    res.json(results);

    }catch(e){
        logger.error("error in searchpostcontroller ", e);
        res.status(500).json({
            success: false,
            message: "Internal server error in searchpostcontroller"
        })
    }
}

module.exports = { searchPostController };