module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    displayName: DataTypes.STRING,
    email: {type: DataTypes.STRING, unique: true},
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  { timestamps: false, underscored: true, tableName: "users" }
  );

 /*  User.associete = (models) => {
    User.hasMany(models)
  } */
  return User
}