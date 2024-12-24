'use strict';

const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const users = [];
        const roles = ['admin', 'manager', 'cashier'];

        for (let i = 0; i < 5; i++) {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`;
            const role = roles[Math.floor(Math.random() * 3)]; // generate from 0-2
            const password = bcrypt.hashSync('abcd1234', 10);

            users.push({
                first_name: firstName,
                last_name: lastName,
                email: email,
                role: role,
                password: password,
                created_at: new Date(),
                updated_at: new Date()
            });
        };

        await queryInterface.bulkInsert('users', users, {});
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
    }
};