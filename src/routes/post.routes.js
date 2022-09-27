const express = require('express');
const postController = require('../controller/post.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const getIdMiddleware = require('../middlewares/getId.middleware');

const routes = express.Router();

routes.post('/', authMiddleware, getIdMiddleware, postController);

module.exports = routes;