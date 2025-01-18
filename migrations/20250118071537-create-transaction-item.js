'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('transaction_items', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            transaction_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            stock_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            quantity: {
                allowNull: false,
                defaultValue: 1,
                type: Sequelize.INTEGER
            },
            price: {
                allowNull: false,
                type: Sequelize.DECIMAL(10,2)
            },
            total_amount: {
                allowNull: false,
                type: Sequelize.DECIMAL(10,2)
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
        await queryInterface.dropTable('transaction_items');
    }
};