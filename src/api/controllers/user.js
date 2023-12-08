const User = require("../models/user");
const BigPromise = require("../middleware/BigPromise");
const cookieToken = require("../util/cookieToken");

exports.createUser = BigPromise(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name) { return next(new Error("Please enter name")); }
  if (!email) { return next(new Error("Please enter email")); }
  if (!password) { return next(new Error("Please enter password")); }
  
  const user = await User.create({
    name,
    email,
    password
  });
  user.password = undefined;
  cookieToken(user, res);
});

exports.signin = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Error("please provide email and password"));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new Error("Email or password does not match or exist"));
  }

  const isPasswordCorrect = await user.isValidatedPassword(password);

  if (!isPasswordCorrect) {
    return next(new Error("Email or password does not match or exist", 400));
  }
  cookieToken(user, res);
});

exports.followUnfollowUser = BigPromise(async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return next(new Error("please provide user id"));
  }

  console.log("req.user: ", req.user, userId);

  if(req.user._id.toString() == userId.toString()) {
    return next(new Error("You cannot follow yourself."));
  }

  const user = await User.findOne({ _id: userId });
  if (!user) {
    return next(new Error("Sorry, but the individual you are trying to follow is not found in the database. Please double-check the username or try following another user."));
  }

  const isFollowed = req.user.followers.find((element) => {
    return element.toString() == userId.toString();
  })

  if(!isFollowed){
    await User.findOneAndUpdate({ _id: req.user._id }, { $push: { followers: userId } });
    return res.status(200).send({ success: true, message: "Follow User Successfully." });
  }else{
    await User.findOneAndUpdate({ _id: req.user._id }, { $pull: { followers: userId } });
    return res.status(200).send({ success: true, message: "Unfollow User Successfully." });
  }

});