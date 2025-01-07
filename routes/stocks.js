const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Validators
const findStockValidator = require('../validators/stock/find');
const addStockValidator = require('../validators/stock/add');
const updateStockValidator = require('../validators/stock/update');
const deleteStockValidator = require('../validators/stock/delete');

// Controller
const stockController = require('../controllers/stockController');

router.get('/:id',
    findStockValidator,
    authMiddleware,
    stockController.find
);

router.get('/products/:product_id',
    authMiddleware,
    stockController.getByProductId
);

router.get('/',
    authMiddleware,
    stockController.get
);

router.post('/',
    addStockValidator,
    authMiddleware,
    stockController.add
);

router.put('/:id',
    updateStockValidator,
    authMiddleware,
    stockController.update
);

router.delete('/:id',
    deleteStockValidator,
    authMiddleware,
    stockController.delete
);

module.exports = router;
