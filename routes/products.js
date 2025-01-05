const express = require('express');
const router = express.Router();
const { Product } = require('../models/index');
const authMiddleware = require('../middlewares/authMiddleware');
const { validationResult } = require('express-validator');

// Validators
const findProductValidator = require('../validators/product/find');
const addProductValidator = require('../validators/product/add');
const updateProductValidator = require('../validators/product/update');
const deleteProductValidator = require('../validators/product/delete');

// Controller
const productController = require('../controllers/productController');

router.get('/:id',
    findProductValidator,
    authMiddleware,
    productController.find
);

router.get('/',
    addProductValidator,
    authMiddleware,
    productController.get
);

router.post('/',
    addProductValidator,
    authMiddleware,
    productController.add
);

router.put('/:id',
    updateProductValidator,
    authMiddleware,
    productController.update
);

router.delete('/:id',
    deleteProductValidator,
    authMiddleware,
    productController.delete
);

module.exports = router;
