const { User } = require('../models');
const { validateNewUser } = require('./validations/validateData');
const { generateToken } = require('../utils/JWT');

const getByUserEmail = (email) => User.findOne({ where: { email } });

const getByUserId = (id) => User.findOne({
  where: { id },
  attributes: { exclude: 'password' },
});

const getUsers = () => User.findAll({
  attributes: { exclude: 'password' },
});

const createUser = async (userData) => {
  const validateInput = await validateNewUser(userData);
  if (validateInput.type) return validateInput;

  const emailVerify = await getByUserEmail(userData.email);
  if (emailVerify) {
    return { type: 409, message: 'User already registered' };
  }

  const profile = await User.create(
    userData,
  );

  const token = await generateToken(profile.dataValues);

  return { type: null, message: { token } };
};

const deleteUser = async (id) => {
  const user = await getByUserId(id);

  if (!user) {
    return { type: 404, message: { message: 'User does not exist' } };
  }

  await User.destroy(
    { where: { id } },
  );

  return { type: 204, message: 'deletado' };
};

module.exports = {
  getByUserEmail,
  createUser,
  getByUserId,
  getUsers,
  deleteUser,
};