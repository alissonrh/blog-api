const { categoryService, postService } = require('../services');

const isBodyValid = (title, content, categoryIds) => title && content && categoryIds;

const createPost = async (req, res) => {
  try {
    const { body, user } = req; body.user = user;
    const { title, content, categoryIds } = req.body;
    if (!isBodyValid(title, content, categoryIds)) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
    const arrayOfCategories = await Promise.all(
      categoryIds.map(async (value) => categoryService.getByCategoryId(value)),
    );
    const someCategoryNotFound = arrayOfCategories.some((c) => c === null);
    if (someCategoryNotFound) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }

    const response = await postService.createPost(body);
    res.status(201).json(response);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

const getAllPost = async (_req, res) => {
  const response = await postService.getAll();
  res.status(200).json(response);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const response = await postService.getPostById(id);
  if (!response) {
    res.status(404).json({ message: 'Post does not exist' });
  }

  res.status(200).json(response);
};

const isBodyValidUpdate = ({ title, content }) => title && content;

const updatePost = async (req, res) => {
  const { body, user } = req; body.user = user;
  const { id } = req.params;
  console.log(req.body);
 
  if (!isBodyValidUpdate(req.body)) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const { type, message } = await postService.updatePost(id, req.body);

  return res.status(type).json(message);
};

module.exports = { createPost, getAllPost, getPostById, updatePost };
