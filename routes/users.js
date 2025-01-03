const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

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
    addUserValidator,
    authMiddleware,
    userController.add
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
