const validate = require('validate.js');
const config = require('../../config');
const MongoDb = require('../../helpers/databases/mongodb/db');
const mongoDb = new MongoDb(config.get('/mongoDbUrl'));
const wrapper = require('../../helpers/utils/wrapper');
const { NotFoundError, InternalServerError } = require('../../helpers/error');
const { ObjectId } = require('mongodb');

module.exports.getAllPlaces = async () => {
    try {
        mongoDb.setCollection('tempat');
        const result = await mongoDb.findAllData();
        // console.log(result);
        if (validate.isEmpty(result)){
            throw new NotFoundError('No list of places in database');
        }
        return result;
    } catch (error) {
        throw new InternalServerError(error.message);
    }
}

module.exports.getOnePlace = async (placeId) => {
    try {
        mongoDb.setCollection('tempat');
        const _id = new ObjectId(placeId);
        const result = await mongoDb.findOne({_id});
        console.log(result);
        if (validate.isEmpty(result)) {
            throw new NotFoundError('Cannot find place');
        }
        return result;
    } catch (error) {
        throw new InternalServerError(error.message);
    }
}

module.exports.addPlace = async (payload) => {
    try {
        mongoDb.setCollection('tempat');
        const result = await mongoDb.insertOne(payload);
        return wrapper.data(result);
    } catch (error) {
        throw new InternalServerError(error.message);
    }
}