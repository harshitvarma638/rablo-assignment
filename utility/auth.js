const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    if(!req.headers['authorization']) {
        return res.status(403).json({message: "Token is required"});
    }
    try{
        const token = req.headers['authorization'];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return next();
    }
    catch(err) {
        return res.status(401).json({message: "Unauthorized"});
    }
}

module.exports = { ensureAuthenticated };