const { param } = require('express-validator');

const deleteDiscountTypeValidator = [
    param('id').isInt().withMessage('ID must be an integer')
]

module.exports = deleteDiscountTypeValidator;