module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    // Giving the Product model a name of type STRING
    username: {
    	type :DataTypes.STRING, 
    	unique : true,
      allowNull: false
    },
    email : {
      type: DataTypes.STRING,
      unique : true,
      allowNull: false
    },
    password : {
      type : DataTypes.STRING.BINARY,
      allowNull: false
    }
  });

  return Users;
};
