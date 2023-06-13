const validate = require('validate.js');
const config = require('../../config');
const MongoDb = require('../../helpers/databases/mongodb/db');
const mongoDb = new MongoDb(config.get('/mongoDbUrl'));
const wrapper = require('../../helpers/utils/wrapper');
const { NotFoundError, InternalServerError } = require('../../helpers/error');
const { ObjectId } = require('mongodb');
const validator = require('../../helpers/utils/validator');

module.exports.getAllPlaces = async (month, year, namaTempat) => {
    try {
        await validator.isMonthsValid(month);
        
        const startDate = new Date(`${month} 1, ${year}`);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
        mongoDb.setCollection('jadwal');
        const result = mongoDb.findMany({
            namaTempat,
            'tanggal': {
                $gte: startDate,
                $lte: endDate
            }
        });
        if (validate.isEmpty(result)){
            throw new NotFoundError('No list of schedule in database');
        }
        return result;
    } catch (error) {
        throw new InternalServerError(error.message);
    }
}

module.exports.getOneSchedule = async (id) => {
    try {
        mongoDb.setCollection('jadwal');
        const _id = new ObjectId(id);
        const result = mongoDb.findOne({_id});
        if (validate.isEmpty(result)) {
            throw new NotFoundError('No schedule found');
        }
        return result;
    } catch (error) {
        throw new InternalServerError(error.message);
    }
}

module.exports.checkAvailability = async (tanggal, waktuAwal, waktuAkhir) => {
    try {
        mongoDb.setCollection('jadwal');
        const overlappingSchedule = await mongoDb.findMany({
            $and: [
                { tanggal: tanggal },
                {
                  $or: [
                    {
                      $and: [
                        { 'waktu.awal': { $lte: waktuAwal } },
                        { 'waktu.akhir': { $gt: waktuAwal } }
                      ]
                    },
                    {
                      $and: [
                        { 'waktu.awal': { $lt: waktuAkhir } },
                        { 'waktu.akhir': { $gte: waktuAkhir } }
                      ]
                    },
                    {
                      $and: [
                        { 'waktu.awal': { $gte: waktuAwal } },
                        { 'waktu.akhir': { $lte: waktuAkhir } }
                      ]
                    }
                  ]
                }
              ]
        })
    
        if (overlappingSchedule.length > 0) {
            console.log('Schedule is not available');
            throw new NotFoundError('Schedule is not avaliable');
        }
        console.log('Schedule is available');
        return wrapper.data({avaliable: true});
    } catch (error) {
        throw new InternalServerError(error.message);        
    }
}

module.exports.inputSchedule = async (tanggal, waktuAwal, waktuAkhir, fullname, namaTempat, org) => {
    try {
        mongoDb.setCollection('jadwal');
        const newSchedule = {
            tanggal: tanggal,
            waktu: {
                awal: waktuAwal,
                akhir: waktuAkhir
            },
            fullname,
            namaTempat,
            org,
            status: 'Proses'
        }

        const result = await mongoDb.insertOne(newSchedule);
        
        console.log('Schedule successfully added');
        return wrapper.data(result);
    } catch (error) {
        console.log('Schedule cannot be added');
        throw new InternalServerError('Schedule cannot be added');
    }
}

module.exports.updateStatus= async (id, status) => {
    try {
        mongoDb.setCollection('jadwal');
        const _id = new ObjectId(id);
        const scheduleData = await mongoDb.findOne({_id});
        
        if (validate.isEmpty(scheduleData.data)) {
            throw new NotFoundError('Schedule not found');
        }

        const result = await mongoDb.upsertOne({_id}, {
            $set: {
                status: status
            }
        });

        return result;
        
    } catch (error) {
        console.log('Schedule cannot be update');
        throw new InternalServerError('Schedule cannot be update');
    }
}