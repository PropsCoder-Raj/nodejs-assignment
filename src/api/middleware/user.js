const BigPromise = require("./BigPromise");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = BigPromise(async (req, res, next) => {
  const token =
  req.header("Authorization") && req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return next(new Error("Login First to access the page or authorization failed."));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
});