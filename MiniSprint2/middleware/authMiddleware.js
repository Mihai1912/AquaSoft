const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No toke provided.' });
    }

    try {
        const secret = 'supersecret';
        const decode = jwt.verify(token, secret);
        req.user = decode;
        next();
    } catch (error){
        res.status(403).json({ message: 'Ivalid or expired token.'})
    }
};

module.exports = authMiddleware;