const { body } = require('express-validator');
const { DiscountType } = require('../../models/index');

const updateDiscoutType = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .custom(async (value, { req }) => {
            const discountType = await DiscountType.findByPk(req.params.id);
            if (!discountType) {
                throw new Error('Discount type not found');
            }
    
            if (value !== discountType.name) {
                const discountTypeExists = await DiscountType.findOne({ where: { name: value } });
                if (discountTypeExists) {
                    throw new Error('Name already exists');
                }
            }
            return true;
        }),

    body('percentage')
        .notEmpty().withMessage('Percentage is required')
        .isInt().withMessage('Percentage must be integer')
        .isLength({ min: 1, max: 100 }).withMessage('Percentage must be between 1 to 100'),
]

module.exports = updateDiscoutType;