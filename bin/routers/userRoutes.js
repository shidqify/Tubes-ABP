const express = require('express');

const { userAuth } = require('./middlewares/userAuth');

const router = express.Router();

const userController = require('./controllers/userControllers');

router.post('/login', userController.login);
router.post('/register', userController.register);

module.exports = router;