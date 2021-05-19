const express = require("express");
const router = express.Router();

const {
    getProductById,
    createProduct,
    getProduct,
    photo,
    updateProduct,
    deleteProduct,
    getAll,
    getAllUniqueCategories
} = require("../controllers/products");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//all of params
router.param("userId", getUserById);
router.param("productId", getProductById);

//all of actual routes
//create route
router.post(
    "/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createProduct
);

// read routes
router.get('/getall', getAll);
router.get("/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//delete route
router.delete(
    "/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteProduct
);

//update route
router.put(
    "/:productId/:userId",

    updateProduct
);

//listing route


router.get('/categories', getAllUniqueCategories);

module.exports = router;