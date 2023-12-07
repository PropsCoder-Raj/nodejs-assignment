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