const express = require('express');
const { loginRoutes, userRoutes, categoriesRoutes } = require('./routes');

const app = express();

app.use(express.json());

app.use('/login', loginRoutes);
app.use('/user', userRoutes);
app.use('/categories', categoriesRoutes);
module.exports = app;
