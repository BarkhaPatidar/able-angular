const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');

var publicKEY  = fs.readFileSync((path.join(__dirname ,'./../services/public.key')), 'utf8');

var authenticateToken = function (req, res, next) {
    var verifyOptions = {
        expiresIn:  "12h",
        algorithm:  ["RS256"]
    };

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, publicKEY, verifyOptions, (err, user) => {
        if(err) return res.sendStatus(401)
        req.user = user;
        next();
    })
}

module.exports = authenticateToken;