const validate = require('validate.js');
const config = require('../../config');
const MongoDb = require('../../helpers/databases/mongodb/db');
const mongoDb = new MongoDb(config.get('/mongoDbUrl'));
const wrapper = require('../../helpers/utils/wrapper');
const { NotFoundError, ConflictError } = require('../../helpers/error');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const generateToken = async (id) => {
    const token = jwt.sign({ id }, config.get('/authentication'));
    return token;
  };

module.exports.login = async (username, password) => {
    mongoDb.setCollection('user');
    const recordSet = await mongoDb.findOne({
        username,
        password : md5(password)
    });
    if (recordSet.err) {
        // return wrapper.error(new NotFoundError('Can not find User'));
        throw new NotFoundError('Wrong Username / Password');
    }
    const userData = recordSet.data;
    const result = {
        userData,
        token : await generateToken(recordSet._id)
    }
    return result;
}

module.exports.register = async (username, password, fullname, org) => {
    mongoDb.setCollection('user');
    const recordSet = await mongoDb.findOne({ username });
    if (!validate.isEmpty(recordSet.data)) {
        console.log('Username already exist');
        throw new ConflictError('Username already exist');
    }
    return mongoDb.insertOne({ 
        username,
        password : md5(password),
        fullname,
        org
    });
}