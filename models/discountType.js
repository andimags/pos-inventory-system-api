'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DiscountType extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            DiscountType.hasMany(models.Transaction, {
                foreignKey: 'discount_type_id',
                as: 'transactions'
            });

            DiscountType.addScope('withTransactions', {
                include: [{
                    model: models.Transaction,
                    as: 'transactions',
                }]
            });
        }
    }
    DiscountType.init({
        name: DataTypes.STRING,
        percentage: DataTypes.INTEGER,
        description: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'DiscountType',
        tableName: 'discount_types',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return DiscountType;
};