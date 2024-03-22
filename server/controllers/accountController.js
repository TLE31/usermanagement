const User = require("../models/User");

// @route    GET api/account
// @desc     Get user account
// @access   Private
exports.getAccount = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findById(id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route    PUT api/account/update
// @desc     Update user account
// @access   Private
exports.updateAccount = async (req, res) => {
  const { id, name, email, gender, about } = req.body;

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.name = name;
    user.email = email;
    user.gender = gender;
    user.about = about;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route    POST api/account/delete
// @desc     Delete user account
// @access   Private
exports.deleteAccount = async (req, res) => {
  const { id } = req.body;

  try {
    await User.findByIdAndDelete(id);
    console.log("User deleted", id);
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route    POST api/account/all
// @desc     Get all user accounts
// @access   Private
exports.getAllAccounts = async (req, res) => {
  try {
    const users = await User.find().select("-password -_id -__v -email");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
