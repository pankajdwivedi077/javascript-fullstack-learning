const logger = require("../utils/logger");
const { uplodaMediaToCloudinary } = require("../utils/cloudinary");
const Media = require("../models/media");

const uploadMedia = async(req,res)=> {

   logger.info("starting media upload");

   try{

    if(!req.file){
        logger.error("no file found");
        res.status(400).json({
            success: false,
            message: "No file found. Please add a file and try again"
        })
    }

    const { originalName, mimeType, buffer } = req.file;
    const userId = req.user.userId;

    logger.info(`File details: name=${originalName}, type=${mimeType}`);
    logger.info("uploading to cloudinary starting");

    const cloudinaryUploadResult = await uplodaMediaToCloudinary(req.file);
    logger.info(`Cloudinary upload successfully. publicId: ${cloudinaryUploadResult.public_id}`)

    const newlyCreatedMedia = new Media({
       publicId: cloudinaryUploadResult.public_id,
       originalName,
       mimeType,
       url: cloudinaryUploadResult.secure_url,
       userId
    })

    await newlyCreatedMedia.save();

    res.status(201).json({
        success: true,
        mediaId: newlyCreatedMedia._id,
        url: newlyCreatedMedia.url,
        message: "Media upload successfull"
    })

   }catch(e){
     logger.error("Error in uploadMedia ", e);
     res.status(500).json({
        success: false,
        message: "Internal server | error in uploadMedia"
     })
   }

}

module.exports = { uploadMedia };