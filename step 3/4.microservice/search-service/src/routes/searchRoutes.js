const express = require("express");
const { searchPostController } = require("../controller/searchController");
const {  authenticateRequest } = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authenticateRequest);

router.get("/search", searchPostController);

module.exports = router;