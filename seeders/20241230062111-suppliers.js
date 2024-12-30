'use strict';

const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const suppliers = [];

        for (let i = 0; i < 5; i++) {
            const supplierName = faker.lorem.words({ min: 1, max: 3 });
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const fullName = `${firstName} ${lastName}`;
            const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`;
            const phone = faker.phone.number({ style: 'international' });

            suppliers.push({
                name: supplierName,
                contact_name: fullName,
                contact_email: email,
                contact_phone: phone,
                created_at: new Date(),
                updated_at: new Date()
            });
        };

        await queryInterface.bulkInsert('suppliers', suppliers, {});
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('suppliers', null, {});
    }
};