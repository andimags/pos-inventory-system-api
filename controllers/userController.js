const { User } = require('../models/index');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const userController = {
    find: async (req, res) => {
        try {
            const error = validationResult(req);

            if (!error.isEmpty()) {
                return res.json(error);
            }

            const { id } = req.params;
            const user = await User.findByPk(id);

            if (!user) {
                return res.json({
                    status: 0,
                    message: 'User not found.'
                })
            }

            return res.json({
                status: 1,
                data: user
            })
        }
        catch (err) {
            res.json({
                status: 0,
                message: `Something went wrong: ${err.message}`
            })
        }
    },
    get: async (req, res) => {
        try {
            const users = await User.findAll();

            return res.json({
                status: 1,
                data: users
            })
        }
        catch (err) {
            res.json({
                status: 0,
                message: `Something went wrong: ${err.message}`
            })
        }
    },
    add: async (req, res) => {
        try {
            const error = validationResult(req);

            if (!error.isEmpty()) {
                return res.json(error);
            }

            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            req.body.password = hashedPassword
            let user = await User.create(req.body);
            user = await User.findByPk(user.id); // query again to remove pw

            return res.json({
                status: 1,
                data: user
            })
        }
        catch (err) {
            res.json({
                status: 0,
                message: `Something went wrong: ${err.message}`
            })
        }
    },
    update: async (req, res) => {
        try {
            const error = validationResult(req);

            if (!error.isEmpty()) {
                return res.json(error);
            }

            const { id } = req.params;
            const user = await User.findByPk(id)

            if (!user) {
                return res.json({
                    status: 0,
                    message: 'User not found.'
                })
            }

            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            req.body.password = hashedPassword

            let updatedUser = await user.update(req.body);
            updatedUser = await User.findByPk(updatedUser.id); // query again to remove pw
    
            return res.json({
                status: 1,
                data: updatedUser
            })
        }
        catch (err) {
            res.json({
                status: 0,
                message: `Something went wrong: ${err.message}`
            })
        }
    },
    delete:  async (req, res) => {
        try {
            const error = validationResult(req);

            if (!error.isEmpty()) {
                return res.json(error);
            }

            const { id } = req.params;
            const user = await User.findByPk(id);

            if (!user) {
                return res.json({
                    status: 0,
                    message: 'User not found.'
                })
            }

            await user.destroy();

            return res.json({
                status: 1,
                message: "User successfully deleted."
            })
        }
        catch (err) {
            res.json({
                status: 0,
                message: `Something went wrong: ${err.message}`
            })
        }
    }
}

module.exports = userController;