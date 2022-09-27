const { Category } = require('../models');
const { validateNewCategory } = require('./validations/validateData');

const getByCategoryId = (id) => Category.findOne({
  where: { id },
  attributes: { exclude: 'password' },
});

const getAll = () => Category.findAll();

const createCategory = async (category) => {
  const validateInput = await validateNewCategory(category);
  if (validateInput.type) return validateInput;

  const newCategory = await Category.create(
    category,
  );

  const getCategory = await getByCategoryId(newCategory.null);

  return { type: null, message: getCategory };
};

module.exports = {
  createCategory,
  getAll,
};
