const categoryService = require('../services/category.service');

const createCategory = async (req, res) => {
  const category = req.body;
  
  const { type, message } = await categoryService.createCategory(
    category,
  );

  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

const getAll = async (_req, res) => {
  const response = await categoryService.getAll();

  return res.status(200).json(response);
};

module.exports = { 
  createCategory, 
  getAll };