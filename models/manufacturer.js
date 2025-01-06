'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Manufacturer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Manufacturer.hasMany(models.Product, {
                foreignKey: 'manufacturer_id',
                as: 'products'
            });

            Manufacturer.addScope('withProducts', {
                include: [{
                    model: models.Product,
                    as: 'products',
                }]
            });
        }
    }
    Manufacturer.init({
        name: DataTypes.STRING,
        contact_email: DataTypes.STRING,
        contact_phone: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Manufacturer',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return Manufacturer;
};