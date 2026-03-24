const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/refresh-token', authController.refreshToken);
router.post('/login', authController.login);
router.post('/logout',auth,authController.logout);

module.exports = router;