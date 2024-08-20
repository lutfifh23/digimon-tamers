const { verifyToken } = require("../helper/jwt")
const { User } = require("../models")

async function authentication(req, res, next) {
    try {
        let access_token = req.headers.authorization
        if (!access_token) {
            throw { name: "Unauthenticated" }
        }
        let [bearer, token] = access_token.split(" ")
        if (bearer !== "Bearer") {
            throw { name: "Unauthenticated" }
        }
        let payload = verifyToken(token)
        let user = await User.findByPk(payload.id)
        if (!user) {
            throw { name: "Unauthenticated" }
        }
        req.user = {
            id: user.id,
            role: user.role
        }
        next()
    } catch (error) {
        console.log(error)
    }
}
module.exports = authentication