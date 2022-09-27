const { getIdByToken } = require('../utils/JWT');
const { userService } = require('../services');

const getIdMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'Token not found Id' });
        }

        const decode = await getIdByToken(token);

        const user = await userService.getByUserEmail(decode.email);

        req.user = user.dataValues.id;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Expired or invalid token Id' });
    }
};

module.exports = getIdMiddleware;