const { param } = require('express-validator');

const findProductValidator = [
    param('id').isInt().withMessage('ID must be an integer')
]

module.exports = findProductValidator;