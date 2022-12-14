const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');
const { validadeUpdateData } = require('./validations/validateData');

const getPostByIdReturn = async (id) => BlogPost.findOne({
  where: { id },
});

const getPostById = async (id) => BlogPost.findOne({
  where: { id },
  include: [
    {
      model: User,
      as: 'user',
      attributes: { exclude: 'password' },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    },
  ],
});

const getAll = async () => BlogPost.findAll({
  include: [
    {
      model: User,
      as: 'user',
      attributes: { exclude: 'password' },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    },
  ],
});

const createPost = async ({ user, title, content, categoryIds }) => {
  try {
      const blogPosts = await BlogPost.create({
        userId: user, title, content, updated: new Date(), published: new Date(),
      });

    Promise.all(categoryIds.map(async (e) => {
        await PostCategory.create({
          postId: blogPosts.null, categoryId: e,
        });
      }));

    return getPostByIdReturn(blogPosts.null);
  } catch (e) {
    console.log(e);
    throw e; 
  }
};

const updatePost = async (id, { title, content, user }) => {
  const validateInput = validadeUpdateData({ title, content, user });
  if (validateInput.type) return validateInput;

  const post = await getPostByIdReturn(id);

  if (post.userId !== user) {
    return { type: 401, message: { message: 'Unauthorized user' } };
  }

  await BlogPost.update(
    { title, content },
    { where: { id } },
  );

  const response = await getPostById(id);

  return { type: 200, message: response };
};

const deletePost = async (id, user) => {
  const post = await getPostByIdReturn(id);

  if (!post) {
    return { type: 404, message: { message: 'Post does not exist' } };
  }

  if (post.userId !== user) {
    return { type: 401, message: { message: 'Unauthorized user' } };
  }

  await BlogPost.destroy(
    { where: { id } },
  );

  return { type: 204, message: 'deletado' };
};

const getByQuery = async (q) => {
  const response = await BlogPost.findAll({
    include: [
      { model: User, 
        as: 'user',
        attributes: { exclude: 'password' },
      },
      { model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
    where: { [Op.or]: { title: { [Op.like]: `%${q}%` }, content: { [Op.like]: `%${q}%` } },
  } });

  return { type: 200, message: response };
};

module.exports = { createPost, 
  getPostById, 
  getAll, 
  updatePost, 
  deletePost, 
  getByQuery };