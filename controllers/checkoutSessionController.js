const { createClient } = require('redis');
const { Stock } = require('../models/index');
const { validationResult } = require('express-validator');

const checkoutSessionController = {
    get: async (req, res) => {
        let redisClient;
        try {
            redisClient = await createClient()
                .on('error', err => console.log('Redis Client Error', err))
                .connect();

            const redisKey = `checkout:cashier${req.user.data.id}`;
            const value = await redisClient.sMembers(redisKey);
            const parsedValue = value.map(item => JSON.parse(item));
            await redisClient.disconnect();
            return res.json({
                status: 1,
                data: parsedValue
            });
        }
        catch (error) {
            await redisClient.disconnect();
            return res.json({
                status: 0,
                message: `Something went wrong: ${error.message}`
            });
        }
    },
    add: async (req, res) => {
        let redisClient;

        try {
            const error = validationResult(req);

            if (!error.isEmpty()) {
                return res.json(error);
            }

            const { quantity } = req.body;
            const { barcode } = req.params;

            const stock = await Stock.scope(['withSupplier', 'withProduct']).findOne({
                where: {
                    barcode: barcode
                }
            });

            if (!stock) {
                throw new Error(`Stock with barcode ${barcode} not found`);
            }

            if (quantity > stock.quantity) {
                throw new Error(`Quantity cannot be greater than the stock's available quantity (${stock.quantity})`);
            }

            const item = {
                barcode: barcode,
                name: stock.product.name,
                quantity: quantity,
                price: stock.price
            };

            const redisKey = `checkout:cashier${req.user.data.id.toString()}`;

            redisClient = await createClient()
                .on('error', err => console.log('Redis Client Error', err))
                .connect();

            await redisClient.sAdd(redisKey, JSON.stringify(item));
            await redisClient.disconnect();

            return res.json(item);
        } catch (error) {
            if (redisClient) {
                await redisClient.disconnect();
            }

            return res.json({
                status: 0,
                message: `Something went wrong: ${error.message}`
            });
        }
    },
    update: async (req, res) => {
        let redisClient;

        try {
            const error = validationResult(req);

            if (!error.isEmpty()) {
                return res.json(error);
            }

            const { quantity } = req.body;
            const { barcode } = req.params;

            redisClient = await createClient()
                .on('error', (err) => console.log('Redis Client Error', err))
                .connect();

            const redisKey = `checkout:cashier${req.user.data.id}`;

            const stockItems = await redisClient.sMembers(redisKey);
            const originalItem = stockItems.find(item => JSON.parse(item).barcode === barcode);

            if (!originalItem) {
                await redisClient.disconnect();
                return res.status(404).json({
                    status: 0,
                    message: `Item with barcode ${barcode} not found`,
                });
            }

            const updatedItem = JSON.stringify({ ...JSON.parse(originalItem), quantity });
            const removedCount = await redisClient.sRem(redisKey, originalItem);

            if (removedCount === 0) {
                throw new Error('Failed to remove the original item from Redis');
            }


            await redisClient.sAdd(redisKey, updatedItem);
            await redisClient.disconnect();

            return res.json({
                status: 1,
                updatedItem: JSON.parse(updatedItem),
            });
        } catch (error) {
            await redisClient.disconnect();
            return res.json({
                status: 0,
                message: `Something went wrong: ${error.message}`
            });
        }
    },
    delete: async (req, res) => {
        let redisClient;

        try {
            const error = validationResult(req);

            if (!error.isEmpty()) {
                return res.json(error);
            }

            redisClient = await createClient()
                .on('error', (err) => console.log('Redis Client Error', err))
                .connect();

            const redisKey = `checkout:cashier${req.user.data.id}`;
            const { barcode } = req.params;
            const stockItems = await redisClient.sMembers(redisKey);
            const stockItemToRemove = stockItems.find(item => JSON.parse(item).barcode === barcode);

            if (!stockItemToRemove) {
                await redisClient.disconnect();
                return res.status(404).json({
                    status: 0,
                    message: `Item with barcode ${barcode} not found`,
                });
            }

            const removedCount = await redisClient.sRem(redisKey, stockItemToRemove);

            if (removedCount === 0) {
                throw new Error('Failed to remove the original item from Redis');
            }

            await redisClient.disconnect();

            return res.json({
                status: 1,
                message: "Checkout item successfully removed"
            })

        }
        catch (error) {
            await redisClient.disconnect();
            return res.json({
                status: 0,
                message: `Something went wrong: ${error.message}`
            });
        }
    },
    deleteAll: async (req, res) => {
        let redisClient;

        try {
            redisClient = await createClient()
                .on('error', (err) => console.log('Redis Client Error', err))
                .connect();

            const redisKey = `checkout:cashier${req.user.data.id}`;
            const stockItems = await redisClient.sMembers(redisKey);

            if (stockItems == []) {
                return res.json({
                    status: 0,
                    message: `No items found with redis key ${redisKey}`
                })
            }

            const removedCount = await redisClient.del(redisKey);

            if (removedCount === 0) {
                throw new Error('Failed to remove checked out items from Redis');
            }

            await redisClient.disconnect();

            return res.json({
                status: 1,
                message: "Checkout items successfully removed"
            })

        }
        catch (error) {
            await redisClient.disconnect();
            return res.json({
                status: 0,
                message: `Something went wrong: ${error.message}`
            });
        }
    }
}

module.exports = checkoutSessionController;