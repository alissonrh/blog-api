const { BlogPost, PostCategory, User, Category } = require('../models');

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

const updatePost = async (id, { title, content }) => {
  const postUpdated = await BlogPost.update(
    { title, content },
    { where: { id } },
  );

  return { type: 200, message: postUpdated };
};

module.exports = { createPost, getPostById, getAll, updatePost };