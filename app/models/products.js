module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    // Giving the Product model a name of type STRING
    name: DataTypes.STRING

  });

  	return Product;
};
