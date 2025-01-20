const { body, param } = require('express-validator');

const updateCheckoutSession = [
    param('barcode')
        .notEmpty().withMessage('Barcode is required')
        .isLength({ min: 18 }).withMessage('Barcode is invalid'),

    body('quantity')
        .notEmpty().withMessage('Quantity is required')
        .isInt({ min: 1 }).withMessage('Quantity must be equal or greater than 1'),
]

module.exports = updateCheckoutSession;