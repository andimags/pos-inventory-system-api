const express = require('express');
const router = express.Router();
const { Supplier } = require('../models/index');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/:id', authMiddleware, async function (req, res) {
    try {
        const { id } = req.params;
        const supplier = await Supplier.findByPk(id);

        if (!supplier) {
            return res.json({
                status: 0,
                message: 'Supplier not found.'
            })
        }

        return res.json({
            status: 1,
            data: supplier
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
        const suppliers = await Supplier.findAll();

        return res.json({
            status: 1,
            data: suppliers
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
        const supplier = await Supplier.create(req.body);

        return res.json({
            status: 1,
            data: supplier
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
        const supplier = await Supplier.findByPk(id)

        if (!supplier) {
            return res.json({
                status: 0,
                message: 'Supplier not found.'
            })
        }

        const updatedSupplier = await supplier.update(req.body);

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
        const supplier = await Supplier.findByPk(id);

        if (!supplier) {
            return res.json({
                status: 0,
                message: 'Supplier not found.'
            })
        }

        await supplier.destroy();

        return res.json({
            status: 1,
            message: "Supplier successfully deleted."
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
