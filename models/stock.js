'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Stock extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Stock.belongsTo(models.Supplier, {
                as: 'supplier',
                foreignKey: {
                    name: 'supplier_id'
                },
            });

            Stock.belongsTo(models.Product, {
                as: 'product',
                foreignKey: {
                    name: 'product_id',
                },
            });

            Stock.addScope('withSupplier', {
                include: [{
                    model: models.Supplier,
                    as: 'supplier',
                    // attributes: ['id', 'name', 'description']
                }]
            });

            Stock.addScope('withProduct', {
                include: [{
                    model: models.Product,
                    as: 'product',
                    // attributes: ['id', 'name', 'description']
                }]
            });
        }

        generateBarcode() {
            return `STK-${String(this.product_id).padStart(4, '0')}-${String(this.supplier_id).padStart(4, '0')}-${String(this.id).padStart(4, '0')}`;
        }
    }
    Stock.init({
        price: DataTypes.DECIMAL(10, 2),
        barcode: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        supplier_id: DataTypes.INTEGER,
        product_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Stock',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return Stock;
};