const { DiscountType } = require('../models/index');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const discountTypeController = {
    find: async (req, res) => {
        try {
            const error = validationResult(req);

            if (!error.isEmpty()) {
                return res.json(error);
            }

            const { id } = req.params;
            const discountType = await DiscountType.findByPk(id);

            if (!discountType) {
                return res.json({
                    status: 0,
                    message: 'Discount Type not found.'
                })
            }

            return res.json({
                status: 1,
                data: discountType
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
            const discountTypes = await DiscountType.findAll({
                order: [['created_at', 'DESC']]
            });

            return res.json({
                status: 1,
                data: discountTypes
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

            let discountType = await DiscountType.create(req.body);

            return res.json({
                status: 1,
                data: discountType
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
            const discountType = await DiscountType.findByPk(id)

            if (!discountType) {
                return res.json({
                    status: 0,
                    message: 'Discount Type not found.'
                })
            }

            let updatedDiscountType = await discountType.update(req.body);

            return res.json({
                status: 1,
                data: updatedDiscountType
            })
        }
        catch (err) {
            res.json({
                status: 0,
                message: `Something went wrong: ${err.message}`
            })
        }
    },
    delete: async (req, res) => {
        try {
            const error = validationResult(req);

            if (!error.isEmpty()) {
                return res.json(error);
            }

            const { id } = req.params;
            const discountType = await DiscountType.findByPk(id);

            if (!discountType) {
                return res.json({
                    status: 0,
                    message: 'Discount Type not found.'
                })
            }

            await discountType.destroy();

            return res.json({
                status: 1,
                message: "Discount Type successfully deleted."
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

module.exports = discountTypeController;