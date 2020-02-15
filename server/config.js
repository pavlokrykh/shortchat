"use strict";

function ExtractJwt (req) {
    let token = null;
    if(req.cookies && req.cookies.token != void(0)) token = req.cookies['token'];
    return token;
};

module.exports = {
    jwt: {
        jwtFromRequest: ExtractJwt,
        secretOrKey: '75zUHRqjtB3TdXZun598w6SYpjxWDDMf',
    },
    expiresIn:'4 hours',
};