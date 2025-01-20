const { param } = require('express-validator');

const deleteCheckoutSessionValidator = [
    param('barcode')
        .notEmpty().withMessage('Barcode is required')
        .isLength({ min: 18 }).withMessage('Barcode is invalid'),
]

module.exports = deleteCheckoutSessionValidator;