'use strict';

const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const products = [];

        for (let i = 0; i < 5; i++) {
            const productName = faker.commerce.product();
            const description = faker.lorem.sentences({ min: 1, max: 2 });

            products.push({
                name: productName,
                description: description,
                created_at: new Date(),
                updated_at: new Date()
            });
        };

        await queryInterface.bulkInsert('products', products, {});
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('products', null, {});
    }
};