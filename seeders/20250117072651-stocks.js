'use strict';

const { Product, Supplier, Stock } = require('../models/index');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        for (let i = 0; i < 10; i++) {
            const price = faker.commerce.price({ min: 20, max: 200 });
            const quantity = faker.number.int({ min: 5, max: 30 });
    
            const product = await Product.findOne({
                order: [Sequelize.fn('RAND')],
            });
            const supplier = await Supplier.findOne({
                order: [Sequelize.fn('RAND')],
            });
    
            if (product && supplier) {
                const stock = await Stock.create({
                    price,
                    quantity,
                    product_id: product.id,
                    supplier_id: supplier.id,
                    created_at: new Date(),
                    updated_at: new Date(),
                });
    
                const barcode = stock.generateBarcode()
    
                stock.barcode = barcode;
                await stock.save();
            }
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('stocks', null, {});
    },
};
