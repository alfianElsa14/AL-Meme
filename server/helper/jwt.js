const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

module.exports = {
    sign: (payload) => {
        return jwt.sign(payload, JWT_SECRET_KEY)
    },
    decodeToken: (token) => {
        return jwt.verify(token, JWT_SECRET_KEY)
    },
}