const expressJwt = require('express-jwt');

const config = require('../config/keys')
const userService = require('../services/user.service');

function jwt() {
    const secret = config.jwtSecret;
    return expressJwt({ secret, isRevoked });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    if (!user) {
        return done(null, true);
    }

    req.userId = user.username
    done();
};

module.exports = jwt;