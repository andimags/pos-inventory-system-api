const { body } = require('express-validator');
const { Product } = require('../../models/index');
const { Op } = require('sequelize');

const updateProductValidator = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .custom(async (value, { req }) => {
            const productExists = await Product.findOne({
                where: {
                    name: value,
                    id: { [Op.not]: req.params.id },
                }
            });

            if (productExists) {
                throw new Error('Name already exists');
            }

            return true;
        }),

    body('description')
        .optional({ nullable: true, checkFalsy: true })
        .isLength({ min: 2, max: 100 }).withMessage('Description must contain between 2 and 100 characters'),

    body('category_ids')
        .optional({ nullable: true, checkFalsy: true })
        .isArray({ min: 0, max: 5, onlyFirstError: true }).withMessage('Category IDs must be between 0-5 items only')
        .isInt().withMessage('Category IDs must be integer'),
]

module.exports = updateProductValidator;