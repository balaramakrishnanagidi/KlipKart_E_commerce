const express = require('express');
const userController = require('../Controller/User');
const adminController = require('../Controller/Admin');
const authController = require('../Controller/authuntication');
const { upload } = require('../Middleware/product');
const { upload1 } = require('../Middleware/banner');
const router = express.Router();

// Admin
router.post('/add_product', upload.single('productImage'), adminController.addProduct);
router.post('/add_banner', upload1.single('banner'), adminController.addBanner);

// User
router.post('/new_user', userController.createUser);
router.get('/all_products', userController.allProducts);
router.get('/all_banners', userController.allBanners);
router.post('/add_to_cart', userController.addToCart);
router.get('/get_cart_items', userController.cartItems);

// User Login

router.post('/user_login', authController.login);

module.exports = router;
