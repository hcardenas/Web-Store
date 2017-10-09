module.exports = function(sequelize, DataTypes) {
  var Categories = sequelize.define("Categories", {
    // Giving the Product model a name of type STRING
    categories: {
    	type: DataTypes.STRING,
    	unique : true
    }
  });


  Categories.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Categories.hasMany(models.Product, {
      onDelete: "cascade"
    });
  };

  return Categories;
};
