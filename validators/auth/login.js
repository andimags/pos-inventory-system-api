const { body } = require('express-validator');

const loginValidator = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .bail()
        .isEmail().withMessage('Invalid email format'),

    body('password')
        .notEmpty().withMessage('Password is required')
]

module.exports = loginValidator;