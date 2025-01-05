const { body } = require('express-validator');
const { Supplier } = require('../../models/index');

const addSupplierValidator = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .custom(async value => {
            const supplierExists = await Supplier.findOne({ where: { name: value } });
            if (supplierExists) {
                throw new Error('Name already exists');
            }
        }),

    body('contact_name')
        .notEmpty().withMessage('Contact name is required')
        .matches(/^[A-Za-z\s]+$/).withMessage('Invalid first name format'),

    body('contact_email')
        .optional({ nullable: true, checkFalsy: true })
        .notEmpty().withMessage('Contact email is required')
        .isEmail().withMessage('Invalid contact email format'),

    body('contact_phone')
        .optional({ nullable: true, checkFalsy: true })
        .isLength({ min: 9, max: 11 }).withMessage('Contact phone must contain between 9 and 11 characters'),
]

module.exports = addSupplierValidator;