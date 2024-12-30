const express = require('express');
const router = express.Router();
const { Category } = require('../models/index');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/:id', authMiddleware, async function (req, res) {
    try {
        const { id } = req.params;
        const category = await Category.scope(['withProducts']).findByPk(id);

        if (!category) {
            return res.json({
                status: 0,
                message: 'Category not found.'
            })
        }

        return res.json({
            status: 1,
            data: category
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
        const categories = await Category.scope(['withProducts']).findAll({
            order: [
                ['created_at', 'DESC'],
            ],
        });

        return res.json({
            status: 1,
            data: categories
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
        const category = await Category.create(req.body);

        return res.json({
            status: 1,
            data: category
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
        const category = await Category.findByPk(id)

        if (!category) {
            return res.json({
                status: 0,
                message: 'Category not found.'
            })
        }

        const updatedSupplier = await category.update(req.body);

        return res.json({
            status: 1,
            data: updatedSupplier
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
        const category = await Category.findByPk(id);

        if (!category) {
            return res.json({
                status: 0,
                message: 'Category not found.'
            })
        }

        await category.destroy();

        return res.json({
            status: 1,
            message: "Category successfully deleted."
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
