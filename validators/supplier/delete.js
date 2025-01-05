const { param } = require('express-validator');

const deleteSupplierValidator = [
    param('id').isInt().withMessage('ID must be an integer')
]

module.exports = deleteSupplierValidator;