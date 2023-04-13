const response = require('../../helpers/utils/wrapper');
const userService = require('../../modules/user/userService');

module.exports.login = async (req, res) => {
    let { username, password } = req.body;

    userService.login(username, password)
        .then(resp => {
            console.log('User has logged in');
            response.response(res, 'success', response.data(resp), 'User has logged in', 201);
        })
        .catch(err => {
            console.log('Error while logging in', err);
            response.response(res, 'fail', response.error(err), `Error while logging in. Error: ${err}`, 401, 401);
        });
}

module.exports.register = async (req, res) => {
    let { username, password, fullname, org} = req.body;

    userService.register(username, password, fullname, org)
        .then(resp => {
            console.log('User has been created');
            response.response(res, 'success', response.data(resp), 'User has been created', 201);
        })
        .catch(err => {
            console.log('User cannot be created', err);
            response.response(res, 'fail', response.error(err), `Error while creating user. Error: ${err}`, 400);
        })
}