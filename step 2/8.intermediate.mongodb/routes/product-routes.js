const express = require('express');
const { insertSampleProducts, getProductsStats, getProductAnalysis } = require('../controller/product-controller');

const router = express.Router();

router.post('/add', insertSampleProducts)
router.get('/get', getProductsStats)
router.get('/analysis', getProductAnalysis)

module.exports = router;