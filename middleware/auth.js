const jwt = require('json-web-token')

exports.verify = function(req, res, next) {
    let accessToken = req.cookies.jwt

    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken) {
        return res.status(403).send()
    }
}