const { userService } = require('../services');
const { generateToken } = require('../utils/JWT');

const isBodyValid = (email, password) => email && password;

const loginCrontroller = async (req, res) => {
try {
  const { email, password } = req.body;
  if (!isBodyValid(email, password)) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const user = await userService.getByUserEmail(email);

  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' }); 
  }

  const token = await generateToken({ email, password });
  res.status(200).json({ token });
} catch (err) {
  return res.status(500).json({ message: 'Erro interno', error: err.message });
}
};

module.exports = loginCrontroller;