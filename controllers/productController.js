const express = require('express');
const { Product } = require('../models/index');
const { validationResult } = require('express-validator');

const categoryController = {
    find: async (req, res) => {
        try {
            const error = validationResult(req);

            if (!error.isEmpty()) {
                return res.json(error);
            }

            const { id } = req.params;
            const product = await Product.scope('withCategories').findByPk(id);

            if (!product) {
                return res.json({
                    status: 0,
                    message: 'Product not found.'
                })
            }

            return res.json({
                status: 1,
                data: product
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
            const products = await Product.scope(['withCategories']).findAll({
                order: [
                    ['created_at', 'DESC'],
                ],
            });

            return res.json({
                status: 1,
                data: products
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

            const { category_ids } = req.body;

            const product = await Product.create(req.body);

            await product.setCategories(category_ids);

            const productWithCategories = await Product.scope('withCategories').findByPk(product.id);

            return res.json({
                status: 1,
                data: productWithCategories
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
            const product = await Product.findByPk(id)

            if (!product) {
                return res.json({
                    status: 0,
                    message: 'Product not found.'
                })
            }

            await product.update(req.body);

            const productWithCategories = await Product.scope('withCategories').findByPk(product.id);

            return res.json({
                status: 1,
                data: productWithCategories
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
            const product = await Product.findByPk(id);

            if (!product) {
                return res.json({
                    status: 0,
                    message: 'Product not found.'
                })
            }

            await product.destroy();

            return res.json({
                status: 1,
                message: "Product successfully deleted."
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

module.exports = categoryController;