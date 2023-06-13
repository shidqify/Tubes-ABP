const express = require('express');

const userAuth = require('./middlewares/userAuth');

const router = express.Router();

const userController = require('./controllers/userControllers');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/view', userAuth, userController.viewUser);

module.exports = router;