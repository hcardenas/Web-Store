module.exports = function(sequelize, DataTypes) {
	var Product = sequelize.define("Product", {
		// Giving the Product model a name of type STRING
		productName: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});


 Product.associate = function (models) {
	Product.belongsTo(models.Categories);
}

	return Product;
};