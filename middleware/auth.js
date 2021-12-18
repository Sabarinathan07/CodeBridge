const jwt = require('jsonwebtoken');
const config = require('config');

//next is a callback
module.exports = function (req, res, next) {
    //get token from header
    const token = req.header('x-auth-token');

    //check if there is no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, Authorization denied' });
    }

    // verify token
    try {
        const decoded = jwt.verify(token, config.get('JWT_TOKEN'));
        req.user = decoded.user;
        next();

    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });

    }
}