module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    // Giving the Product model a name of type STRING
    name: DataTypes.STRING
  });

  return Users;
};
