const { BlogPost, PostCategory } = require('../models');

const getPostById = async (id) => BlogPost.findOne({
  where: { id },
});

const createPost = async ({ user, title, content, categoryIds }) => {
  try {
   /*  const result = await sequelize.transaction(async (t) => { */
      const blogPosts = await BlogPost.create({
        userId: user, title, content, updated: new Date(), published: new Date(),
      });
      await Promise.all(categoryIds.map(async (e) => {
        PostCategory.create({
          postId: blogPosts.null, categoryId: e,
        });
      }));

    return getPostById(blogPosts.null);
  } catch (e) {
    console.log(e);
    throw e; 
  }
};

module.exports = { createPost, getPostById };