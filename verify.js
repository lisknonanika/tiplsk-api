var jwt = require('jsonwebtoken');
var config = require('./config');

module.exports = (req, res, next) => {
    const token = (req.session && req.session.token) || req.headers['x-access-token'];
    if (!token) return res.status(403).send({result: false, error: 'Invalid Token'});

    jwt.verify(token, config.secret, (error, decoded) => {
        if (error) return res.status(403).send({result: false, error: 'Invalid Token'});
        req.decoded = decoded;
        next();
    });
}