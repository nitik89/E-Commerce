const express = require('express');
const router = express.Router();
const { getUserById } = require('../controllers/user');

const { getCategoryById, createCategory, getAllCategory, updateCategory, deleteCategory } = require('../controllers/category');
const { isAuthenticated, isSignedIn, isAdmin } = require('../controllers/auth');
router.post('/create/:userId', createCategory);
router.get('/:categoryId', getCategoryById);
router.get('/', getAllCategory);

//put

router.put('/update/:categoryId/:userId', updateCategory);
//delete
router.delete('/delete/:categoryId/:userId', deleteCategory);
module.exports = router;