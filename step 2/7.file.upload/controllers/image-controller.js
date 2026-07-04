const Image = require('../models/image');
const { uploadToCloudinary } = require('../helpers/cloudinaryHelper');
const fs = require('fs');
const cloudinary = require('../config/cloudinary')

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

// const fetchImage = async(req, res) => {
//     try{
     
//         const images = await Image.find({});

//         if(images){
//             res.status(200).json({
//                 success: true,
//                 data: images
//             })
//         }

//     }catch(e){
//          console.log(e);
//         res.status(500).json({
//             success: false,
//             message: 'Something went wrong in fetchImage'
//         })
//     }
// }

// for pagination
const fetchImage = async(req, res) => {
    try{
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page -1) * limit;

        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
        const totalImage = await Image.countDocuments();
        const totalPage = Math.ceil(totalImage/limit);

        const sortObj = {};
        sortObj[sortBy] = sortOrder;

        const images = await Image.find().sort(sortObj).skip(skip).limit(limit);

        if(images){
            res.status(200).json({
                success: true,
                currentPage: page,
                totalPages: totalPage,
                totalImage: totalImage,
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

const deleteImage = async(req, res) => {
    try{
      
       const getCurrentIdOfImageToBeDeleted = req.params.id;
       const userId = req.userInfo.userId;

       const image = await Image.findById(getCurrentIdOfImageToBeDeleted);

       if (!image){
        return res.status(400).json({
            success: false,
            message: 'Image not found'
        })
       }

       // check if this image is upload by the current user who is trying to delete it
       if(image.uploadedBy.toString() !== userId){
        return res.status(403).json({
            success: false,
            message: 'you are not authorized to delete this image'
        })
       }

       // delete the image from cloudinary
       await cloudinary.uploader.destroy(image.publicId);

       // delete this image from database
       await Image.findByIdAndDelete(getCurrentIdOfImageToBeDeleted);

       res.status(200).json({
        success: true,
        message: 'image deleted successfully'
       })

    }catch (e){
           console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong in deleteImage'
        })
    }
}

module.exports = {
    uploadImage,
    deleteImage,
    fetchImage
}