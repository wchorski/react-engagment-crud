const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET } = require('../config/config')

const verifyJWT = (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)

    const token = authHeader.split(' ')[1]
    console.log('---verifyJWT: ' + token)
    jwt.verify(
        token,
        ACCESS_TOKEN_SECRET,


        (err, decoded) => {
            if (err) return res.sendStatus(403) //invalid token
            req.user = decoded.UserInfo.username
            console.log(req.user);
            req.roles = decoded.UserInfo.roles
            next()
        }
    )
}

module.exports = verifyJWT