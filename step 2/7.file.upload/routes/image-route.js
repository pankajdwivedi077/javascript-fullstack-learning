const express = require('express');
const { uploadImage, fetchImage } = require('../controllers/image-controller');
const adminMiddleware = require('../middleware/admin-middleware')
const authMiddleware = require('../middleware/auth-middleware')
const uploadMiddleware = require('../middleware/upload-middleware')

const router = express.Router();

// upload the images
router.post('/upload', authMiddleware, adminMiddleware, uploadMiddleware.single('image'), uploadImage);

// to get all the images
router.get('/get', authMiddleware, fetchImage);

module.exports = router;