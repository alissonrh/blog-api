const express = require('express');
const { categoryController } = require('../controller');
const authMiddleware = require('../middlewares/auth.middleware');

const routes = express.Router();

routes.post('/', authMiddleware, categoryController.createCategory);
routes.get('/', authMiddleware, categoryController.getAll);

module.exports = routes;