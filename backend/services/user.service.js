const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config/keys')
const dbUsers = require('../utils/db').users;

module.exports = {
    authenticate,
    create,
    getById,
};

async function authenticate({ username, password }) {
    const user = dbUsers.find(user => user.username === username);
    if (user && bcrypt.compareSync(password, user.hashPassword)) {
        const token = jwt.sign({ sub: user.username }, config.jwtSecret, { expiresIn: '12h' });
        return {
            username: user.username,
            token
        };
    }
}

function validateUserParam(userParam) {
    const missingFields = [];
    if (!userParam.username) {
        missingFields.push('username');
    }
    if (!userParam.password) {
        missingFields.push('password');
    }

    if (missingFields.length > 0) {
        throw `Not all fields were filled, the following fields are missing: ${missingFields.toString()}.`;
    }

    if (dbUsers.find(user => user.username === userParam.username)) {
        throw `Username ${userParam.username} is already taken.`;
    }
}

async function create(userParam) {
    validateUserParam(userParam);

    const hashPassword = bcrypt.hashSync(userParam.password, 10);

    const user = {
        username: userParam.username,
        hashPassword
    };

    dbUsers.push(user);
}

async function getById(username) {
    const user = dbUsers.find(user => user.username === username);
    if (user) {
        const { hashPassword, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}