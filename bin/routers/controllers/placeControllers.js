const wrapper = require('../../helpers/utils/wrapper');
const placeService = require('../../modules/places/placeService');

module.exports.getAllPlaces = async (req, res) => {
    placeService.getAllPlaces()
        .then(resp => {
            console.log('All places has been retrieved from database');
            wrapper.response(res, 'success', resp, 'All places has been retrieved from database', 200);
        })
        .catch(err => {
            console.log('Cannot retrieve data from database');
            wrapper.response(res, 'fail', wrapper.error(err), `Cannot retrieve data from database. Error ${err}`, 400);
        });
}

module.exports.getOnePlace = async (req, res) => {
    let placeId = req.params.id;
    placeService.getOnePlace(placeId)
        .then(resp => {
            console.log('Place has been retrieved from database');
            wrapper.response(res, 'success', resp, `Place has been retrieved from database`, 200);
        })
        .catch(err => {
            console.log('Cannot retrive data from database');
            wrapper.response(res, 'fail', wrapper.error(err), `Cannot retrive data from database. Error ${err}`, 400);
        });
}

module.exports.addPlace = async (req, res) => {
    const payload = {
        nama: req.body.nama,
        desc: req.body.desc,
        fasilitas: req.body.fasilitas,
        kapasitas: req.body.kapasitas
    }
    placeService.addPlace(payload)
        .then(resp => {
            console.log('Place has been added to database');
            wrapper.response(res, 'success', resp, `${payload.nama} has been added to database`, 200);
        })
        .catch(err => {
            console.log('Cannot add data to database');
            wrapper.response(res, 'fail', wrapper.error(err), `Cannot add data to database. Error ${err}`, 400);
        });
}