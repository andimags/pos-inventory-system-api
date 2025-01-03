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
                onDelete: 'CASCADE',
                foreignKey: 'product_id',
                otherKey: 'category_id',
                as: 'categories',
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
        description: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Product',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Product;
};