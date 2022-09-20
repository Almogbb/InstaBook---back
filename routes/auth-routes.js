const express = require('express');

const authController = require('../controllers/auth-controller');

const router = express.Router();

router.get('/users', authController.getUsers);

// router.post('/users', authController.addUser);

router.post('/signup', authController.signUp);

module.exports = router;
