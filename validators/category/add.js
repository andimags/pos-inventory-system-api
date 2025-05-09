const { body } = require('express-validator');
const { Category } = require('../../models/index');

const addCategoryValidator = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .custom(async value => {
            const categoryExists = await Category.findOne({ where: { name: value } });
            if (categoryExists) {
                throw new Error('Name already exists');
            }
        }),

    body('description')
        .optional({ nullable: true, checkFalsy: true })
        .isLength({ min: 2, max: 100 }).withMessage('Description must contain between 2 and 100 characters')
]

module.exports = addCategoryValidator;