module.exports = function(sequelize, DataTypes) {
  var Categories = sequelize.define("Categories", {
    // Giving the Product model a name of type STRING
    categories: { type: DataTypes.STRING, unique: true } 
  }, {
      associate: function(models) {
        Categories.hasMany(models.Product, {foreignKey: { allowNull: false }, onDelete:'CASCADE', hooks:true});
      }
    
  });

  return Categories;
};