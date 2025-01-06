const { Manufacturer } = require('../models/index');
const { validationResult } = require('express-validator');

const manufacturerController = {
    find: async (req, res) => {
        try {
            const error = validationResult(req);

            if (!error.isEmpty()) {
                return res.json(error);
            }

            const { id } = req.params;
            const manufacturer = await Manufacturer.scope('withProducts').findByPk(id);

            if (!manufacturer) {
                return res.json({
                    status: 0,
                    message: 'Manufacturer not found.'
                })
            }

            return res.json({
                status: 1,
                data: manufacturer
            })
        }
        catch (err) {
            res.json({
                status: 0,
                message: `Something went wrong: ${err.message}`
            })
        }
    },
    get:    async (req, res) => {
        try {
            const manufacturers = await Manufacturer.scope(['withProducts']).findAll({
                order: [
                    ['created_at', 'DESC'],
                ],
            });

            return res.json({
                status: 1,
                data: manufacturers
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

            let manufacturer = await Manufacturer.create(req.body);

            return res.json({
                status: 1,
                data: manufacturer
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
            let manufacturer = await Manufacturer.findByPk(id)

            if (!manufacturer) {
                return res.json({
                    status: 0,
                    message: 'Manufacturer not found.'
                })
            }

            await manufacturer.update(req.body);

            manufacturer = await Manufacturer.scope('withProducts').findByPk(manufacturer.id);

            return res.json({
                status: 1,
                data: manufacturer
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
            const manufacturer = await Manufacturer.findByPk(id);

            if (!manufacturer) {
                return res.json({
                    status: 0,
                    message: 'Manufacturer not found.'
                })
            }

            await manufacturer.destroy();

            return res.json({
                status: 1,
                message: "Manufacturer successfully deleted."
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

module.exports = manufacturerController;