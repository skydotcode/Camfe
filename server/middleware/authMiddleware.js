const jwt = require('jsonwebtoken');
const ExpressError = require('../utilis/ExpressError.js');

const authMiddleware = (req, res, next) => {
  // token is sent in request headers as:
  // Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ExpressError(401, 'Access denied — no token provided');
  }

  // extract token — remove "Bearer " prefix
  const token = authHeader.split(' ')[1];

  try {
    // verify checks if token is valid and not expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded = { id: "64f1a2b3...", iat: 1234567890, exp: 1234567890 }
    // attach user id to request so routes can use it
    req.userId = decoded.id;

    next();  // token valid — move to route handler
  } catch (err) {
    throw new ExpressError(401, 'Invalid or expired token');
  }
};

module.exports = authMiddleware;