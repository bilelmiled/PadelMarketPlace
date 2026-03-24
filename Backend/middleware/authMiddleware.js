const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = async (req, res, next) => {
    try {
         const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Non authentifié" });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Malformed token' });
    }

    const token = parts[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    if (!decoded || !decoded.id) return res.status(401).json({ message: 'Invalid token' });

     const user = await User.findById(decoded.id).select('-password'); // exclude password
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user; // Attach the user object to the request
    next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Authentication failed' });
    }
   
    
}

