const {
  userData,
  categoryData,
} = require('./schema');

const validateNewUser = ({ email, password, displayName }) => {
  const { error } = userData.validate({ email, password, displayName });
  if (error) {
    return { type: 400, message: error.message };
  }
  return { type: null, message: '' };
};

const validateNewCategory = ({ name }) => {
  const { error } = categoryData.validate({ name });
  if (error) {
    return { type: 400, message: error.message };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateNewUser,
  validateNewCategory,
};