const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Validators
const addDiscountTypeValidator = require('../validators/discountType/add');
const findDiscountTypeValidator = require('../validators/discountType/find');
const updateDiscountTypeValidator = require('../validators/discountType/update');
const deleteDiscountTypeValidator = require('../validators/discountType/delete');

// Controller
const discountTypeController = require('../controllers/discountTypeController');

router.get('/:id',
    findDiscountTypeValidator,
    authMiddleware,
    discountTypeController.find
);

router.get('/', authMiddleware, discountTypeController.get);

router.post('/',
    addDiscountTypeValidator,
    authMiddleware,
    discountTypeController.add
);

router.put('/:id',
    updateDiscountTypeValidator,
    authMiddleware,
    discountTypeController.update
    );

router.delete('/:id',
    deleteDiscountTypeValidator,
    authMiddleware,
    discountTypeController.delete
);

module.exports = router;
