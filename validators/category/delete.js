const { param } = require('express-validator');

const deleteCategoryValidator = [
    param('id').isInt().withMessage('ID must be an integer')
]

module.exports = deleteCategoryValidator;