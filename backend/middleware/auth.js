const jwt = require('jsonwebtoken');

//next is a callback
const middleware =  (req, res, next)  => {
    //get token from header
    const token = req.header('x-auth-token');

    //check if there is no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, Authorization denied' });
    }

    // verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = decoded.user;
        next();

    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });

    }
}
module.exports = middleware;