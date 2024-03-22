const express = require("express");
const router = express.Router();
const otpController = require("../controllers/otpController");

// @route    POST api/otp/generate
// @desc     Generate OTP
// @access   Public
router.post("/generate", otpController.generateOtp);

// @route    POST api/otp/verify
// @desc     Verify OTP
// @access   Public
router.post("/verify", otpController.verifyOtp);

module.exports = router;
