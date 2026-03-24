const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadImage');
const isAdmin = require('../middleware/isAdmin');

router.post('/add', auth,isAdmin, upload.array('images', 5), productController.createProduct);
router.get('/all', productController.getAllProducts);
router.get('/product/:id', productController.getProductById);
router.delete('/productDel/:id', auth, isAdmin, productController.deleteProduct);
router.get('/productByCat/:category',productController.getProductByCat);

module.exports = router; 