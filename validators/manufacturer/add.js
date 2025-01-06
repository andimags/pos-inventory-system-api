const { body } = require('express-validator');
const { Manufacturer } = require('../../models/index');

const addManufacturerValidator = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .custom(async value => {
            const supplierExists = await Manufacturer.findOne({ where: { name: value } });
            if (supplierExists) {
                throw new Error('Name already exists');
            }
        }),

    body('contact_email')
        .optional({ nullable: true, checkFalsy: true })
        .notEmpty().withMessage('Contact email is required')
        .isEmail().withMessage('Invalid contact email format'),

    body('contact_phone')
        .optional({ nullable: true, checkFalsy: true })
        .isLength({ min: 9, max: 11 }).withMessage('Contact phone must contain between 9 and 11 characters'),
]

module.exports = addManufacturerValidator;