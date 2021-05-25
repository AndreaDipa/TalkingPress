const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    const token = req.cookies['x-auth-token'];
    if (!token) return res.status(401).redirect('/pages/login.html');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next()
    }
    catch(ex) {
        res.status(400).redirect('/pages/login.html')
    }
}

module.exports = auth;