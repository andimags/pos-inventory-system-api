const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createClient } = require('redis');
const { Transaction, TransactionItem, Stock } = require('../models/index');

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
    userController.find
);

router.get('/', authMiddleware, userController.get);

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

            let transaction = await Transaction.create({...req.body, cashier_id: req.user.data.id});

            const transactionItems = await Promise.all(
                checkedOutItems.map(async (checkedOutItem) => {
                    const stock = await Stock.findOne({
                        where: { barcode: checkedOutItem.barcode },
                    });
            
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

            transaction.total_amount = totalAmount;
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

router.put('/:id',
    updateUserValidator,
    authMiddleware,
    userController.update
);

router.delete('/:id',
    deleteUserValidator,
    authMiddleware,
    userController.delete
);

module.exports = router;
