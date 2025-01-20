const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Controller
const checkoutSessionController = require('../controllers/checkoutSessionController');

// Validators
const addCheckoutSession = require('../validators/checkoutSession/add');
const updateCheckoutSession = require('../validators/checkoutSession/update');
const deleteCheckoutSession = require('../validators/checkoutSession/delete');

router.get(
    '/',
    authMiddleware,
    checkoutSessionController.get
);

router.post(
    '/:barcode',
    addCheckoutSession,
    authMiddleware,
    checkoutSessionController.add
);

router.put(
    '/:barcode',
    updateCheckoutSession,
    authMiddleware,
    checkoutSessionController.update
);

router.delete(
    '/:barcode',
    deleteCheckoutSession,
    authMiddleware,
    checkoutSessionController.delete
)

router.delete(
    '/',
    authMiddleware,
    checkoutSessionController.deleteAll
)



module.exports = router;
