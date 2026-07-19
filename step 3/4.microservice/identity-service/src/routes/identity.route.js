const express = require("express");
const { registerUser, loginUser, createRefreshToken, logoutUser } = require("../controller/identity.controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", createRefreshToken);
router.post("/logout", logoutUser);

module.exports = router;