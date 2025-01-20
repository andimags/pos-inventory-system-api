const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createClient } = require('redis');
const { Transaction, TransactionItem, Stock, DiscountType } = require('../models/index');
const { validationResult } = require('express-validator');

// Validators
const addUserValidator = require('../validators/user/add');
const findUserValidator = require('../validators/user/find');
const updateUserValidator = require('../validators/user/update');
const deleteUserValidator = require('../validators/user/delete');

// Controller
const userController = require('../controllers/userController');

router.get('/:id',
    findUserValidator,
    authMiddleware,
    async (req, res) => {
        try {
            const error = validationResult(req);

            if (!error.isEmpty()) {
                return res.json(error);
            }

            const { id } = req.params;
            const transaction = await Transaction.scope('withTransactionItems').findByPk(id);

            if (!transaction) {
                return res.json({
                    status: 0,
                    message: 'Transaction not found.'
                })
            }

            return res.json({
                status: 1,
                data: transaction
            })
        }
        catch (err) {
            res.json({
                status: 0,
                message: `Something went wrong: ${err.message}`
            })
        }
    }
);

router.get('/', authMiddleware, async (req, res) => {
    try {
        const transactions = await Transaction.scope('withTransactionItems').findAll();

        return res.json({
            status: 1,
            data: transactions
        })
    }
    catch (err) {
        res.json({
            status: 0,
            message: `Something went wrong: ${err.message}`
        })
    }
});

router.post('/',
    // addUserValidator,
    authMiddleware,
    async (req, res) => {
        let redisClient;

        try {
            const redisKey = `checkout:cashier${req.user.data.id}`;

            redisClient = await createClient()
                .on('error', err => console.log('Redis Client Error', err))
                .connect();

            let checkedOutItems = await redisClient.sMembers(redisKey);
            checkedOutItems = checkedOutItems.map(checkedOutItem => JSON.parse(checkedOutItem));
            await redisClient.disconnect();

            let transaction = await Transaction.create({ ...req.body, cashier_id: req.user.data.id });

            const transactionItems = await Promise.all(
                checkedOutItems.map(async (checkedOutItem) => {
                    const stock = await Stock.findOne({
                        where: { barcode: checkedOutItem.barcode },
                    });

                    stock.quantity -= checkedOutItem.quantity;
                    await stock.save();

                    return {
                        transaction_id: transaction.id,
                        stock_id: stock.id,
                        quantity: checkedOutItem.quantity,
                        price: stock.price,
                        total_amount: checkedOutItem.quantity * stock.price,
                    };
                })
            );

            await TransactionItem.bulkCreate(transactionItems);

            const totalAmount = await TransactionItem.sum('total_amount', {
                where: {
                    transaction_id: transaction.id
                }
            });

            const { discount_type_id } = req.body;

            if (discount_type_id) {
                const discountType = await DiscountType.findByPk(discount_type_id);
                const discount = totalAmount * discountType.percentage / 100;
                const finalAmount = totalAmount - discount;

                transaction.total_amount = totalAmount;
                transaction.discount = discount;
                transaction.final_amount = finalAmount;
            }

            await transaction.save();
            transaction = await Transaction.scope('withTransactionItems').findByPk(transaction.id);

            redisClient = await createClient()
                .on('error', (err) => console.log('Redis Client Error', err))
                .connect();

            await redisClient.del(redisKey);
            await redisClient.disconnect();

            return res.json({
                status: 1,
                data: transaction
            });
        }
        catch (error) {
            res.json({
                status: 0,
                message: `Something went wrong: ${error.message}`
            })
        }
    }
);

router.delete('/:id',
    deleteUserValidator,
    authMiddleware,
    async (req, res) => {
        try {
            const error = validationResult(req);

            if (!error.isEmpty()) {
                return res.json(error);
            }

            const { id } = req.params;
            const transaction = await Transaction.findByPk(id);

            if (!transaction) {
                return res.json({
                    status: 0,
                    message: 'Transaction not found.'
                })
            }

            await transaction.destroy();

            return res.json({
                status: 1,
                message: "Transaction successfully deleted."
            })
        }
        catch (err) {
            res.json({
                status: 0,
                message: `Something went wrong: ${err.message}`
            })
        }
    }
);

module.exports = router;
