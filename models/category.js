'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Category.belongsToMany(models.Product, {
                through: models.categoryProducts,
                onDelete: 'CASCADE',
                foreignKey: 'category_id',
                as: 'products'
            });

            Category.addScope('withProducts', {
                include: [{
                    model: models.Product,
                    as: 'products',
                    through: {
                        attributes: []
                    }
                }],
            });
        }
    }
    Category.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Category',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return Category;
};