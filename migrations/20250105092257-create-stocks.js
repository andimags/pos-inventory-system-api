'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('stocks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            barcode: {
                type: Sequelize.STRING
            },
            price: {
                allowNull: false,
                type: Sequelize.DECIMAL(10, 2),
                validate: {
                    isDecimal: true
                }
            },
            quantity: {
                allowNull: false,
                defaultValue: 0,
                type: Sequelize.INTEGER
            },
            supplier_id: {
                type: Sequelize.INTEGER
            },
            product_id: {
                type: Sequelize.INTEGER
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('stocks');
    }
};