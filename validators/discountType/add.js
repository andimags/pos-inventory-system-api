const { body } = require('express-validator');
const { DiscountType } = require('../../models/index');

const addDiscountTypeValidator = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .custom(async value => {
            const discountTypeExists = await DiscountType.findOne({ where: { name: value } });
            if (discountTypeExists) {
                throw new Error('Name already exists');
            }
        }),

    body('percentage')
        .notEmpty().withMessage('Percentage is required')
        .isInt().withMessage('Percentage must be integer')
        .isLength({ min: 1, max: 100 }).withMessage('Percentage must be between 1 to 100'),
]

module.exports = addDiscountTypeValidator;