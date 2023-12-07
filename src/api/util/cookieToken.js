const cookieToken = (user, res) => {
  const token = user.getJwtToken();

  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(200).cookie("token", token, options).json({
    success: true,
    token,
    user,
    options
  });
};

module.exports = cookieToken;