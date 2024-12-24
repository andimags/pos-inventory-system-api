const express = require('express');
const router = express.Router();
const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/:id', authMiddleware, async function (req, res) {
    try {
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
});

router.get('/', authMiddleware, async function (req, res) {
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
});

router.post('/', authMiddleware, async function (req, res) {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword
        const user = await User.create(req.body);

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
});

router.put('/:id', authMiddleware, async function (req, res) {
    try {
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

        const updatedUser = await user.update(req.body);

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
});

router.delete('/:id', authMiddleware, async function (req, res) {
    try {
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
});

module.exports = router;
