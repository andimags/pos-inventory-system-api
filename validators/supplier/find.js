const { param } = require('express-validator');

const findSupplierValidator = [
    param('id').isInt().withMessage('ID must be an integer')
]

module.exports = findSupplierValidator;