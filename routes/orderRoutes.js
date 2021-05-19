const express = require('express');
const router = express.Router();
const { getUserById, pushOrderInPurchaseList } = require('../controllers/user');

const { getCategoryById, createCategory, getAllCategory, updateCategory } = require('../controllers/category');
const { isAuthenticated, isSignedIn, isAdmin } = require('../controllers/auth');
const { updateStock } = require('../controllers/products');
const { getOrderByID, createOrder, getAllOrders, getOrderStatus, updateStatus } = require('../controllers/orders');
const Orders = require('../controllers/orders');
//params
router.param("userId", getUserById);
router.param("orderId", getOrderByID);

//create
router.post('/order/create/:userId', isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder);

//read
router.get('/order/all/:userId', isSignedIn, isAuthenticated, isAdmin, getAllOrders)

//status of the order
router.get("order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus)
router.get('order/:orderId/status/:userId', isSignedIn, isAuthenticated, isAdmin, updateStatus);
module.exports = router;