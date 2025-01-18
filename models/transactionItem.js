'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TransactionItem extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            TransactionItem.belongsTo(models.Transaction, {
                as: 'transaction',
                foreignKey: {
                    name: 'transaction_id'
                },
            });

            TransactionItem.belongsTo(models.Stock, {
                as: 'stock',
                foreignKey: {
                    name: 'stock_id'
                },
            });

            TransactionItem.addScope('withTransaction', {
                include: [{
                    model: models.Transaction,
                    as: 'transaction',
                }]
            });

            TransactionItem.addScope('withStock', {
                include: [{
                    model: models.Stock,
                    as: 'stock',
                }]
            });
        }
    }
    TransactionItem.init({
        transaction_id: DataTypes.INTEGER,
        stock_id: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        price: DataTypes.DECIMAL(10,2),
        total_amount: DataTypes.DECIMAL(10,2)
    }, {
        sequelize,
        modelName: 'TransactionItem',
        tableName: 'transaction_items',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return TransactionItem;
};