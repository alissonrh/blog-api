const express = require('express');
const { userCrontroller } = require('../controller');
const authMiddleware = require('../middlewares/auth.middleware');
const getIdMiddleware = require('../middlewares/getId.middleware');

const routes = express.Router();

routes.post('/', userCrontroller.createUser);
routes.get('/', authMiddleware, userCrontroller.getAll);
routes.get('/:id', authMiddleware, userCrontroller.getByUserId);
routes.delete('/me', authMiddleware, getIdMiddleware, userCrontroller.deleteUser);

module.exports = routes;
