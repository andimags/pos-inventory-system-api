'use strict';

const { Product, Supplier, Stock } = require('../models/index');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const stocks = [];

        for (let i = 0; i < 10; i++) {
            const price = faker.commerce.price({ min: 20, max: 200 });
            const quantity = faker.number.int({ min: 5, max: 30 });

            // Fetch random Product and Supplier
            const product = await Product.findOne({
                order: [
                    Sequelize.fn('RAND'),
                ]
            });
            const supplier = await Supplier.findOne({
                order: [
                    Sequelize.fn('RAND'),
                ]
            });

            if (product && supplier) {
                const stock = Stock.build({
                    price,
                    quantity,
                    product_id: product.id,
                    supplier_id: supplier.id,
                });

                stocks.push({
                    price,
                    quantity,
                    product_id: product.id,
                    supplier_id: supplier.id,
                    barcode: stock.generateBarcode(), // Use Stock's generateBarcode method
                    created_at: new Date(),
                    updated_at: new Date(),
                });
            }
        }

        await queryInterface.bulkInsert('stocks', stocks, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('stocks', null, {});
    },
};
