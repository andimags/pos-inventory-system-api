const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Validators
const findManufacturerValidator = require('../validators/manufacturer/find');
const addManufacturerValidator = require('../validators/manufacturer/add');
const updateManufacturerValidator = require('../validators/manufacturer/update');
const deleteManufacturerValidator = require('../validators/manufacturer/delete');

// Controller
const manufacturerController = require('../controllers/manufacturerController');

router.get('/:id',
    findManufacturerValidator,
    authMiddleware,
    manufacturerController.find
);

router.get('/',
    addManufacturerValidator,
    authMiddleware,
    manufacturerController.get
);

router.post('/',
    addManufacturerValidator,
    authMiddleware,
    manufacturerController.add
);

router.put('/:id',
    updateManufacturerValidator,
    authMiddleware,
    manufacturerController.update
);

router.delete('/:id',
    deleteManufacturerValidator,
    authMiddleware,
    manufacturerController.delete
);

module.exports = router;
