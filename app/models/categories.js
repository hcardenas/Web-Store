module.exports = function(sequelize, DataTypes) {
  var Categories = sequelize.define("Categories", {
    // Giving the Product model a name of type STRING
    categories: {
    	type: DataTypes.STRING,
    	unique : true
    }
  });

  return Categories;
};
