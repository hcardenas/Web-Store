module.exports = function(sequelize, DataTypes) {
	var Product = sequelize.define("Product", {
		// Giving the Product model a name of type STRING
		productName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		categories: {
			type: DataTypes.STRING,
			allowNull: false
		},
	}, {
		associate: function(models) {
			Product.belongsTo(models.Categories , {onDelete:'CASCADE'});
		}
	});

	return Product;
};