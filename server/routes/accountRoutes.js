const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

// @route    POST api/account
// @desc     Get user account
// @access   Private
router.post("/", accountController.getAccount);

// @route    PUT api/account/update
// @desc     Update user account
// @access   Private
router.put("/update", accountController.updateAccount);

// @route    POST api/account/delete
// @desc     Delete user account
// @access   Private
router.post("/delete", accountController.deleteAccount);

// @route    POST api/account/all
// @desc     Get all user accounts
// @access   Private
router.post("/all", accountController.getAllAccounts);

module.exports = router;
