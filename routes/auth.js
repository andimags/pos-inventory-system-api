const express = require('express');
const router = express.Router();
const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async function (req, res, next) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            attributes: { include: ['password'] },
            where: { email: email }
        });

        if (!user) {
            return res.json({
                status: 0,
                message: 'User not found.'
            })
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if (!result) {
                return res.json({
                    status: 0,
                    message: 'Invalid email or password.'
                })
            }
        });

        const token =
            jwt.sign({
                data: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    role: user.role
                }
            }, process.env.PRIVATE_KEY, { expiresIn: '1d' });

        return res.json({
            status: 1,
            message: 'User successfully logged in.',
            token: token
        })
    }
    catch (err) {
        res.json({
            status: 0,
            message: `Something went wrong: ${err.message}`
        })
    }
});

router.post('/verify-token', function (req, res, next) {
    try {
        const { token } = req.body;
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        res.json({
            status: 1,
            message: "Token verified.",
            data: decoded
        })
    }
    catch (err) {
        res.json({
            status: 0,
            message: `Something went wrong: ${err.message}`
        })
    }
});

module.exports = router;
