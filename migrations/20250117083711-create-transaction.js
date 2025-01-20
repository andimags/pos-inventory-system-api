'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('transactions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            customer_name: {
                type: Sequelize.STRING
            },
            total_amount: {
                type: Sequelize.DECIMAL(10, 2)
            },
            discount_type_id: {
                type: Sequelize.INTEGER
            },
            discount: {
                allowNull: false,
                defaultValue: 0.00,
                type: Sequelize.DECIMAL(10, 2)
            },
            final_amount: {
                type: Sequelize.DECIMAL(10, 2)
            },
            cashier_id: {
                allowNull: false,
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
        await queryInterface.dropTable('transactions');
    }
};