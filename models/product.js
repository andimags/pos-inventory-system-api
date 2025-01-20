'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Product.belongsToMany(models.Category, {
                through: models.categoryProducts,
                onDelete: 'SET NULL',
                foreignKey: 'product_id',
                otherKey: 'category_id',
                as: 'categories',
            });

            Product.hasMany(models.Stock, {
                foreignKey: 'product_id',
            });

            Product.belongsTo(models.Manufacturer, {
                as: 'manufacturer',
                foreignKey: {
                    name: 'manufacturer_id',
                },
            });

            Product.addScope('withManufacturer', {
                include: [{
                    model: models.Manufacturer,
                    as: 'manufacturer',
                }]
            });
        
            Product.addScope('withCategories', {
                include: [{
                    model: models.Category,
                    as: 'categories',
                    attributes: ['id', 'name', 'description'],
                    through: {
                        attributes: []
                    }
                }],
                // attributes: { exclude: ['created_at', 'updated_at'] }
            });        
        }
    }
    Product.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        manufacturer_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Product',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Product;
};