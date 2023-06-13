const wrapper = require('../../helpers/utils/wrapper');
const userService = require('../../modules/user/userService');

module.exports.login = async (req, res) => {
    let { username, password } = req.body;

    userService.login(username, password)
        .then(resp => {
            console.log('User has logged in');
            wrapper.response(res, 'success', wrapper.data(resp), 'User has logged in', 201);
        })
        .catch(err => {
            console.log('Error while logging in', err);
            wrapper.response(res, 'fail', wrapper.error(err), `Error while logging in. Error: ${err}`, 401, 401);
        });
}

module.exports.register = async (req, res) => {
    let { username, password, fullname, org} = req.body;

    userService.register(username, password, fullname, org)
        .then(resp => {
            console.log('User has been created');
            wrapper.response(res, 'success', wrapper.data(resp), 'User has been created', 201);
        })
        .catch(err => {
            console.log('User cannot be created', err);
            wrapper.response(res, 'fail', wrapper.error(err), `Error while creating user. Error: ${err}`, 400);
        });
}

module.exports.viewUser = async (req, res) => {
    const userData = req.userData;

    userService.viewUser(userData)
        .then(resp => {
            console.log('User has found');
            wrapper.response(res, 'success', wrapper.data(resp), 'User has found', 200);
        })
        .catch(err => {
            console.log('User not found');
            wrapper.response(res, 'fail', wrapper.error(err), `Error while finding user. Error: ${err}`, 404);
        });
}