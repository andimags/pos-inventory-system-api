const { body } = require('express-validator');

const loginValidator = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
]

module.exports = loginValidator;