module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    updated: DataTypes.DATE,
    published: DataTypes.DATE,
  },
    {
      timestamps: false, tableName: "blog_posts", underscored: true
    });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      as: "user",
      foreignKey: "userId"
    })
  }

  return BlogPost
}
