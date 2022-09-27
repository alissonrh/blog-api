const express = require('express');
const { loginCrontroller } = require('../controller');

const routes = express.Router();

routes.post('/', loginCrontroller);

module.exports = routes;
