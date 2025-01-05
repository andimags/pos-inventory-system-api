const { Supplier } = require('../models/index');
const { validationResult } = require('express-validator');

const supplierController = {
    find: async (req, res) => {
        try {
            const error = validationResult(req);

            if (!error.isEmpty()) {
                return res.json(error);
            }

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
    },
    get: async (req, res) => {
        try {
            const suppliers = await Supplier.findAll({
                order: [
                    ['created_at', 'DESC'],
                ]
            });
    
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
    },
    add: async (req, res) => {
        try {
            const error = validationResult(req);

            if (!error.isEmpty()) {
                return res.json(error);
            }

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
    },
    update: async (req, res) => {
        try {
            const error = validationResult(req);

            if (!error.isEmpty()) {
                return res.json(error);
            }

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
    },
    delete: async (req, res) => {
        try {
            const error = validationResult(req);

            if (!error.isEmpty()) {
                return res.json(error);
            }

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
    }
}

module.exports = supplierController;