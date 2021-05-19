const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getToken, processPayment } = require('../controllers/payment')
router.get("/gettoken/:userId", isSignedIn, isAuthenticated, getToken);
router.post("/braintree/:userId", isSignedIn, isAuthenticated, processPayment);

module.exports = router