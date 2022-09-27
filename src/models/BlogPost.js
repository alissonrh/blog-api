module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
    {
      tableName: "blog_posts"
    });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      as: "user",
      foreignKey: "user_id"
    })
  }

  return BlogPost
}
