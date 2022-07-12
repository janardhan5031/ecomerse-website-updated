const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/product/:productId',shopController.getProduct);   //product.id

//redirecting to cart page when click on add to cart
router.get('/cart', shopController.getCart);

// adding the product details from request to cart model file to store
router.post('/cart',shopController.postcart);

// getting data from file and showing in cart page
router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
