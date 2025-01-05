const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Validators
const findSupplierValidator = require('../validators/supplier/find');
const addSupplierValidator = require('../validators/supplier/add');
const updateSupplierValidator = require('../validators/supplier/update');
const deleteSupplierValidator = require('../validators/supplier/delete');

// Controller
const supplierController = require('../controllers/supplierController');

router.get('/:id',
    findSupplierValidator,
    authMiddleware,
    supplierController.find
);

router.get('/',
    authMiddleware,
    supplierController.get
);

router.post('/',
    addSupplierValidator,
    authMiddleware,
    supplierController.add
);

router.put('/:id',
    updateSupplierValidator,
    authMiddleware,
    supplierController.update
);

router.delete('/:id',
    deleteSupplierValidator,
    authMiddleware,
    supplierController.delete
);

module.exports = router;
