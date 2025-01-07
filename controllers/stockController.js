const { Stock } = require('../models/index');
const { validationResult } = require('express-validator');

const stockController = {
    find: async (req, res) => {
        try {
            const error = validationResult(req);

            if (!error.isEmpty()) {
                return res.json(error);
            }

            const { id } = req.params;
            const stock = await Stock.scope(['withSupplier', 'withProduct']).findByPk(id);

            if (!stock) {
                return res.json({
                    status: 0,
                    message: 'Stock not found.'
                })
            }

            return res.json({
                status: 1,
                data: stock
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
            const stocks = await Stock.scope(['withSupplier', 'withProduct']).findAll({
                order: [
                    ['created_at', 'DESC'],
                ],
            });

            return res.json({
                status: 1,
                data: stocks
            })
        }
        catch (err) {
            res.json({
                status: 0,
                message: `Something went wrong: ${err.message}`
            })
        }
    },
    getByProductId: async (req, res) => {
        try {
            const { product_id } = req.params;

            const stocks = await Stock.scope(['withSupplier', 'withProduct']).findAll({
                order: [
                    ['created_at', 'DESC'],
                ],
                where: {
                    'product_id': product_id
                }
            });

            return res.json({
                status: 1,
                data: stocks
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

            const { product_id, supplier_id } = req.body;

            let stock = await Stock.create(req.body);
            await stock.setSupplier(supplier_id);
            await stock.setProduct(product_id);
            
            stock = await Stock.scope(['withSupplier', 'withProduct']).findByPk(stock.id);
            stock.barcode = stock.generateBarcode();
            await stock.save();

            return res.json({
                status: 1,
                data: stock
            });
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
            let stock = await Stock.findByPk(id)

            if (!stock) {
                return res.json({
                    status: 0,
                    message: 'Stock not found.'
                })
            }

            await stock.update(req.body);

            stock = await Stock.scope(['withSupplier', 'withProduct']).findByPk(stock.id);
            stock.barcode = stock.generateBarcode();
            await stock.save();

            return res.json({
                status: 1,
                data: stock
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
            const { id } = req.params;
            const stock = await Stock.findByPk(id);

            if (!stock) {
                return res.json({
                    status: 0,
                    message: 'Stock not found.'
                })
            }

            await stock.destroy();

            return res.json({
                status: 1,
                message: "Stock successfully deleted."
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

module.exports = stockController;