'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
    models.User.hasMany(models.Message)
  };
  return Users;
};