const Image = require('../models/image');
const { uploadToCloudinary } = require('../helpers/cloudinaryHelper');
const fs = require('fs');

const uploadImage = async(req,res) => {
    try{

       // check if file is missing in req object
       if(!req.file){
        return res.status(400).json({
            success: false,
            message: 'File is required'
        })
       }

       // upload to cloudinary
       const {url, publicId} = await uploadToCloudinary(req.file.path);

       // store the image url and public along with the upload userId in db
       const newlyUploadImage = new Image({
        url,
        publicId,
        uploadedBy: req.userInfo.userId
       })

       await newlyUploadImage.save();

       // delete the file from local storage
       fs.unlinkSync(req.file.path);

       res.status(201).json({
        success: true,
        message: 'image upload successfull',
        image: newlyUploadImage
       })

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong in uploadImage'
        })
    }
}

const fetchImage = async(req, res) => {
    try{
     
        const images = await Image.find({});

        if(images){
            res.status(200).json({
                success: true,
                data: images
            })
        }

    }catch(e){
         console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong in fetchImage'
        })
    }
}

module.exports = {
    uploadImage,
    fetchImage
}