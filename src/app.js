const express = require('express');
const { loginRoutes, userRoutes, categoriesRoutes, postRoutes } = require('./routes');

const app = express();

app.use(express.json());

app.use('/login', loginRoutes);
app.use('/user', userRoutes);
app.use('/categories', categoriesRoutes);
app.use('/post', postRoutes);
module.exports = app;
