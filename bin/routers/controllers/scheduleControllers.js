const { wrap } = require('lodash');
const wrapper = require('../../helpers/utils/wrapper');
const scheduleService = require('../../modules/schedules/scheduleService');

module.exports.getAllSchedules = async (req, res) => {
    let month = req.query.month;
    let year = req.query.year;
    let namaTempat = req.body.namaTempat;
        
    scheduleService.getAllSchedules(month, year, namaTempat)
        .then(resp => {
            console.log('All schedules has been retrieved from database');
            wrapper.response(res, 'success', resp, 'All schedules has been retrieved from database', 200);
        })
        .catch(err => {
            console.log('Cannot retrieve data from database');
            wrapper.response(res, 'fail', wrapper.error(err), `Cannot retrieve data from database. Error ${err}`, 400);
        });
}

module.exports.getOneSchedule = async (req, res) => {
    let id = req.params.id;

    scheduleService.getOneSchedule(id)
        .then(resp => {
            console.log('Schedule has been retrieved from database');
            wrapper.response(res, 'success', resp, 'Schedule has been retrieved from database', 200);
        })
        .catch(err => {
            console.log('Cannot retireve data from database');
            wrapper.response(res, 'fail', wrapper.error(err), `Cannot retrieve data from database. Error ${err}`, 400);
        });
}

module.exports.checkAvailability = async (req, res) => {
    let namaTempat = req.body.namaTempat;
    let tanggal = req.body.tanggal;
    let waktuAwal = req.body.waktuAwal;
    let waktuAkhir = req.body.waktuAkhir;

    scheduleService.checkAvailability(namaTempat, tanggal, waktuAwal, waktuAkhir)
        .then(resp => {
            console.log('Schedule available');
            wrapper.response(res, 'success', resp, 'Schedule available', 200);
        })
        .catch(err => {
            console.log('Schedule isn\'t available');
            wrapper.response(res, 'fail', wrapper.error(err), `Schedule isn't available. Error: ${err}`, 400);
        });
}

module.exports.inputSchedule = async (req, res) => {
    let {tanggal, waktuAwal, waktuAkhir, fullname, namaTempat, org} = req.body;

    scheduleService.inputSchedule(tanggal, waktuAwal, waktuAkhir, fullname, namaTempat, org)
        .then(resp => {
            console.log('Schedule successfully added');
            wrapper.response(res, 'success', resp, 'Schedule successfully added', 200);
        })
        .catch(err => {
            console.log('Schedule cannot be added');
            wrapper.response(res, 'fail', wrapper.error(err), `Schedule cannot be added. Error: ${err}`, 400);
        });
}

module.exports.updateStatus= async (req, res) => {
    let id = req.params.id;
    let status = req.query.status;

    scheduleService.updateStatus(id, status)
        .then(resp => {
            console.log('Schedule successfully updated');
            wrapper.response(res, 'success', resp, 'Schedule successfully updated', 200);
        })
        .catch(err => {
            console.log('Schedule cannot be update');
            wrapper.response(res, 'fail', wrapper.error(err), `Schedule cannot be update. Error: ${err}`, 400);
        });
}