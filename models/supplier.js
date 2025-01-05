'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Supplier extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Supplier.hasMany(models.Stock, {
                foreignKey: 'supplier_id',
            });
        }
    }
    Supplier.init({
        name: DataTypes.STRING,
        contact_name: DataTypes.STRING,
        contact_email: DataTypes.STRING,
        contact_phone: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Supplier',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return Supplier;
};