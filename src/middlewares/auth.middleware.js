const { authTokenValidation } = require('../utils/JWT');

const authMiddleware = async (req, res, next) => {
 try {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    
    await authTokenValidation(token);
 
    next();
 } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = authMiddleware;