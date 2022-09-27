const express = require('express');
const { postController } = require('../controller');

const authMiddleware = require('../middlewares/auth.middleware');
const getIdMiddleware = require('../middlewares/getId.middleware');

const routes = express.Router();

routes.post('/', authMiddleware, getIdMiddleware, postController.createPost);
routes.get('/', authMiddleware, postController.getAllPost);
routes.get('/:id', authMiddleware, postController.getPostById);

module.exports = routes;