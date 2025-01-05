const express = require('express');
const router = express.Router();
const { Category } = require('../models/index');
const authMiddleware = require('../middlewares/authMiddleware');
const { validationResult } = require('express-validator');

// Validators
const findCategoryValidator = require('../validators/category/find');
const addCategoryValidator = require('../validators/category/add');
const updateCategoryValidator = require('../validators/category/update');
const deleteCategoryValidator = require('../validators/category/delete');

// Controller
const categoryController = require('../controllers/categoryController');

router.get('/:id',
    findCategoryValidator,
    authMiddleware,
    categoryController.find
);

router.get('/',
    authMiddleware,
    categoryController.get
);

router.post('/',
    addCategoryValidator,
    authMiddleware,
    categoryController.add
);

router.put('/:id',
    updateCategoryValidator,
    authMiddleware,
    categoryController.update
);

router.delete('/:id',
    deleteCategoryValidator,
    authMiddleware,
    categoryController.delete
);

module.exports = router;
