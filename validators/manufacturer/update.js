const { body } = require('express-validator');
const { Manufacturer } = require('../../models/index');

const updateManufacturerValidator = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .custom(async (value, { req }) => {
            if (value !== req.body.old_name) {
                const manufacturerExists = await Manufacturer.findOne({ where: { name: value } });
                if (manufacturerExists) {
                    throw new Error('Name already exists');
                }
            }
            return true;
        }),

    body('contact_email')
        .optional({ nullable: true, checkFalsy: true })
        .notEmpty().withMessage('Contact email is required')
        .isEmail().withMessage('Invalid contact email format'),

    body('contact_phone')
        .optional({ nullable: true, checkFalsy: true })
        .isLength({ min: 9, max: 11 }).withMessage('Contact phone must contain between 9 and 11 characters'),
    ]

module.exports = updateManufacturerValidator;