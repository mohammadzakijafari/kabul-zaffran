const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

// importing order functions from controller
const { createOrder, getUserOrder } = require('../controllers/order');

router.post("/orders/create", verifyToken, createOrder);
router.get('/orders', verifyToken, getUserOrder);

module.exports = router;