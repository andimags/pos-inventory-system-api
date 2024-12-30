'use strict';

const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const categories = [];

        for (let i = 0; i < 5; i++) {
            const categoryName = faker.commerce.department();
            const description = faker.lorem.sentences({ min: 1, max: 2 });

            categories.push({
                name: categoryName,
                description: description,
                created_at: new Date(),
                updated_at: new Date()
            });
        };

        await queryInterface.bulkInsert('categories', categories, {});
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('categories', null, {});
    }
};