const { param } = require('express-validator');

const findUserValidator = [
    param('id').isInt().withMessage('ID must be an integer')
]

module.exports = findUserValidator;