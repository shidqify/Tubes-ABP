// buat api yang ngatur jadwal
// jadwalnya di koneksikan dgn tempat
// jadwalnya nampilin based on filter yang diterapkan, defaultnya dalam 30 hari kedepan
// nyimpan jadwalnya hanya bisa jika di jadwal tersebut gk ada peminjaman lain

const express = require('express');

const userAuth = require('./middlewares/userAuth');

const router = express.Router();

const scheduleController = require('./controllers/scheduleControllers');

router.get('/view', scheduleController.getAllSchedules);
router.get('/view/:id', scheduleController.getOneSchedule);
router.get('/availability', scheduleController.checkAvailability);
router.post('/input', scheduleController.inputSchedule);
router.put('/update/:id', scheduleController.updateStatus);

module.exports = router;