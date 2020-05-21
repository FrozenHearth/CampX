const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const { email, userId, firstName } = decodedToken;
    req.userData = {
      email,
      userId,
      firstName,
      expiry: decodedToken.exp
    };
    next();
  } catch (error) {
    res.status(402).json({
      message: 'Not authorized'
    });
  }
};
