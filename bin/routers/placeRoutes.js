const express = require('express');

const userAuth = require('./middlewares/userAuth');

const router = express.Router();

const placeController = require('./controllers/placeControllers');
const imageUploader = require('../helpers/utils/imageUploader');

router.get('/view', placeController.getAllPlaces);
router.get('/view/:id', placeController.getOnePlace);
router.post('/add', placeController.addPlace);

module.exports = router;