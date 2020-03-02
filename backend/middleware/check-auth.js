const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
      firstName: decodedToken.firstName,
      expiry: decodedToken.exp
    };
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Not authenticated'
    });
  }
};
