const { body } = require('express-validator');
const { User } = require('../../models/index');

const addUserValidator = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .custom(async value => {
            const userExists = await User.findOne({ where: { email: value } });
            if (userExists) {
                throw new Error('E-mail already in use');
            }
        }),

    body('first_name')
        .notEmpty().withMessage('First name is required')
        .isAlpha().withMessage('First name must contain only letters'),

    body('last_name')
        .notEmpty().withMessage('Last name is required')
        .isAlpha().withMessage('Last name must contain only letters'),

    body('role')
        .notEmpty().withMessage('Role is required'),  // Corrected message

    body('password')
        .isLength({ min: 8, max: 100 }).withMessage('Password must contain between 8 and 100 characters')
        .matches(/.*[A-Z].*/).withMessage('Password must contain an upper case letter')
        .matches(/.*[a-z].*/).withMessage('Password must contain a lower case letter')
        .matches(/.*[!@#$%^&*(),.?":{}|<>].*/).withMessage('Password must contain a special character'),
]

module.exports = addUserValidator;