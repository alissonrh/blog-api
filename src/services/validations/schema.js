const Joi = require('joi');

const userData = Joi.object({
  displayName: Joi.string().min(8).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

const categoryData = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  userData,
  categoryData,
};