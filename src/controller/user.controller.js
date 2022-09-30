const { userService } = require('../services');

const createUser = async (req, res) => {
  const userData = req.body;
  
  const { type, message } = await userService.createUser(
    userData,
  );

  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

const getAll = async (_req, res) => {
  const response = await userService.getUsers();

  return res.status(200).json(response);
};

const getByUserId = async (req, res) => {
  const { id } = req.params;
  const response = await userService.getByUserId(id);

  if (!response) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  return res.status(200).json(response);
};

const deleteUser = async (req, res) => {
  const { user } = req;
  console.log('entrou');

  const { type, message } = await userService.deleteUser(user);

  return res.status(type).json({ message });
};

module.exports = {
  getAll,
  createUser,
  getByUserId,
  deleteUser,
};