const otpModel = require("../models/otpModel");
const nodemailer = require("nodemailer");

// @route    POST api/otp/generate
// @desc     Generate OTP
// @access   Public
exports.generateOtp = async (req, res) => {
  // Generate a random 6-digit number as OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Store this OTP in database or cache associated with the user for later verification
  const email = req.body.email;
  const otpData = {
    email,
    otp,
    createdAt: new Date(),
  };

  await otpModel.create(otpData);

  // Implement email sending functionality
  // Send the OTP to the user's email
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: req.body.email,
    subject: "Your OTP for account verification",
    text: `Your OTP is ${otp}`,
  };

  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: "Failed to send OTP email" });
    } else {
      console.log("OTP " + otp + " Sent: " + info.response);
      res.json({ success: true, msg: "OTP Sent!" });
    }
  });
};

// @route    POST api/otp/verify
// @desc     Verify OTP
// @access   Public
exports.verifyOtp = async (req, res) => {
  const { otp } = req.body;

  // Retrieve the stored OTP from database or cache and compare with the provided OTP
  try {
    const otpData = await otpModel
      .findOne({ email: req.body.email })
      .sort({ createdAt: -1 });

    // If OTPs match, send success response
    if (otpData.otp === otp) {
      return res.json({ success: true });
    }

    // Otherwise, send error response
    else {
      return res.status(400).json({ success: false, msg: "Invalid OTP" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
