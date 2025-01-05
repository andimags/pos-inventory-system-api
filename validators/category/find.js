const { param } = require('express-validator');

const findCategoryValidator = [
    param('id').isInt().withMessage('ID must be an integer')
]

module.exports = findCategoryValidator;