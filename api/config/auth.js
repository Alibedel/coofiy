const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

// Decodes a Bearer token if present and attaches req.user.
// Invalid/expired tokens are treated as anonymous; route guards (checkAuth)
// decide whether a given route actually requires a logged-in user.
module.exports = function (req, res, next) {
  let token = req.get('Authorization') || req.query.token || req.body.token;
  if (!token) return next();
  token = token.replace('Bearer ', '');
  jwt.verify(token, SECRET, function (err, decoded) {
    if (err) return next();
    req.user = decoded.user;
    req.exp = decoded.exp;
    next();
  });
};
