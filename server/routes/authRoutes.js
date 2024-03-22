const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// @route    POST api/auth/signin
// @desc     Authenticate user & get token
// @access   Public
router.post("/signin", authController.authenticateUser);

// @route    POST api/auth/signup
// @desc     Register user
// @access   Public
router.post("/signup", authController.signupUser);

module.exports = router;
