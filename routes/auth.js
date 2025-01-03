const express = require('express');
const router = express.Router();

// Validators
const loginValidator = require('../validators/auth/login');

// Controllers
const authController = require('../controllers/authController');

router.post('/login',
    loginValidator,
    authController.login
);

router.post('/verify-token',
    authController.verifyToken
);

module.exports = router;
