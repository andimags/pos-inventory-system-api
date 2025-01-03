const { param } = require('express-validator');

const deleteUserValidator = [
    param('id').isInt().withMessage('ID must be an integer')
]

module.exports = deleteUserValidator;