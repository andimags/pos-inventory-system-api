const { User } = require('../models/index');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    login: async (req, res, next) => {
        try {
            // const error = validationResult(req);

            // if (!error.isEmpty()) {
            //     return res.json(error);
            // }
            
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

            await bcrypt.compare(password, user.password, function (err, result) {
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
                        id: user.id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        role: user.role
                    }
                }, process.env.PRIVATE_KEY, { expiresIn: '1d' });

            const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

            return res.json({
                status: 1,
                message: 'User successfully logged in.',
                token: token,
                decoded: decoded
            })
        }
        catch (err) {
            return res.json({
                status: 0,
                message: `Something went wrong: ${err.message}`
            })
        }
    },
    verifyToken: (req, res, next) => {
        try {
            const { token } = req.body;
            const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
            return res.json({
                status: 1,
                message: "Token verified.",
                data: decoded
            })
        }
        catch (err) {
            return res.json({
                status: 0,
                message: `Something went wrong: ${err.message}`
            })
        }
    }
}

module.exports = authController;