const express = require('express');
const { userCrontroller } = require('../controller');
const authMiddleware = require('../middlewares/auth.middleware');

const routes = express.Router();

routes.post('/', userCrontroller.createUser);
routes.get('/', authMiddleware, userCrontroller.getAll);
routes.get('/:id', authMiddleware, userCrontroller.getByUserId);

module.exports = routes;
