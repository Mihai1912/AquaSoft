const jwt = require('jsonwebtoken');

const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret');

      if (decoded.role === requiredRole) {
        req.user = decoded;
        next();
      } else {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }
    } catch (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  };
};


module.exports = authorizeRole;