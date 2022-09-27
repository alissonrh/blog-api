const express = require('express');
const postController = require('../controller/post.controller');

const authMiddleware = require('../middlewares/auth.middleware');

const routes = express.Router();

routes.post('/', authMiddleware, postController);

module.exports = routes;