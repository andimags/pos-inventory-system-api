const { body } = require('express-validator');

const addStockValidator = [
    body('price')
        .isDecimal().withMessage('Price must be a decimal number')
        .matches(/^\d{1,8}(\.\d{1,2})?$/).withMessage('Price must be a decimal with up to 8 digits before the decimal and 2 digits after'),

    body('quantity')
        .notEmpty().withMessage('Quantity is required')
        .isInt().withMessage('Quantity must be an integer'),

    body('supplier_id')
        .notEmpty().withMessage('Supplier ID is required')
        .isInt().withMessage('Supplier ID must be an integer'),

    body('product_id')
        .notEmpty().withMessage('Product ID is required')
        .isInt().withMessage('Product ID must be an integer'),
]

module.exports = addStockValidator;