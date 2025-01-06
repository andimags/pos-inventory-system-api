const { param } = require('express-validator');

const deleteProductValidator = [
    param('id').isInt().withMessage('ID must be an integer')
]

module.exports = deleteProductValidator;