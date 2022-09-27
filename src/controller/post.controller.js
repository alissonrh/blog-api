const { categoryService, postService } = require('../services');

const isBodyValid = (title, content, categoryIds) => title && content && categoryIds;

const postController = async (req, res) => {
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

module.exports = postController;
