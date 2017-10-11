module.exports = function(sequelize, DataTypes) {

	var Product = sequelize.define("Product", {
		// Giving the Product model a name of type STRING
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		price: {
			type: DataTypes.STRING,
			allowNull: false
		},
		imgSrc: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});


 Product.associate = function (models) {
	Product.belongsTo(models.Categories);
}

	return Product;
};