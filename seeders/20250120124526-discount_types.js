'use strict';

const { Product, Supplier, Stock } = require('../models/index');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const discountsTypes = [
            {
                name: "PWD",
                percentage: 20,
                description: "visual impairment etc.",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: "Senior",
                percentage: 30,
                description: "Ages 60 and above",
                created_at: new Date(),
                updated_at: new Date()
            }
        ]

        await queryInterface.bulkInsert('discount_types', discountsTypes, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('discount_types', null, {});
    },
};
