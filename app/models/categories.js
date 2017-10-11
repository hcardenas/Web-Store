module.exports = function(sequelize, DataTypes) {
  var Categories = sequelize.define("Categories", {
    // Giving the Product model a name of type STRING
    name: { type: DataTypes.STRING, unique: true } 
  });

  

  Categories.associate = function (models) {
   Categories.hasMany(models.Product, {
      onDelete: "cascade"
    });

	}


  return Categories;
};