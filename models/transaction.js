'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Transaction.belongsTo(models.DiscountType, {
                as: 'discount_type',
                foreignKey: {
                    name: 'discount_type_id'
                },
            });

            Transaction.hasMany(models.TransactionItem, {
                as: 'transaction_items',
                foreignKey: {
                    name: 'transaction_id'
                },
                onDelete: 'CASCADE'
            });

            Transaction.addScope('withDiscountType', {
                include: [{
                    model: models.DiscountType,
                    as: 'discount_type',
                }]
            });

            Transaction.addScope('withTransactionItems', {
                include: [{
                    model: models.TransactionItem,
                    as: 'transaction_items',
                }]
            });
        }
    }
    Transaction.init({
        customer_name: DataTypes.STRING,
        total_amount: DataTypes.DECIMAL(10, 2),
        discount_type_id: DataTypes.INTEGER,
        discount: DataTypes.DECIMAL(10, 2),
        final_amount: DataTypes.DECIMAL(10, 2),
        cashier_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Transaction',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return Transaction;
};