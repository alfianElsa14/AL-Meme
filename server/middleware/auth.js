const { handleInternalError } = require("../helper/errorHandler")
const { decodeToken } = require("../helper/jwt")


exports.authentication = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization

        if (!bearerToken) {
            return res.status(403).json({ message: 'Invalid Token' })
        }

        const access_token = bearerToken.replace('Bearer ', '')
        const decode = decodeToken(access_token)
        req.user = decode

        next()
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}



exports.authorizationEditMeme = async (req, res, next) => {
    try {
        const role = req.user.role

        if (role !== 'premium') {
            return res.status(403).json({ message: "Fitur ini untuk premium" })
        } 
        
        next()
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

