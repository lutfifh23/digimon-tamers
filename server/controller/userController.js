const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt')
const { signToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

module.exports = class UserController {
    static async userRegister(req, res, next) {
        try {
            const user = await User.create(req.body)
            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email
            })
        } catch (error) {
            next(error)
        }
    }
    static async userLogin(req, res, next) {
        const { email, password } = req.body
        try {
            if (!email || !password) {
                throw { name: "InvalidInput" }
            }
            const user = await User.findOne({ where: { email } })
            if (!user || !comparePassword(password, user.password)) {
                throw { name: "InvalidUser" }
            }
            const token = signToken({ id: user.id })
            res.status(200).json({ access_token: token })
        } catch (error) {
            next(error)
        }
    }
    static async userLoginGoogle(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                //idToken dari access_token by google
                idToken: req.body.googleToken,
                //audience simpan di .env
                audience: "923413476972-9kp68mp4s33scru9p0cqanf18vqd4o14.apps.googleusercontent.com",
            });
            const payload = ticket.getPayload();
            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                hooks: false,
                defaults: {
                    username: `${payload.family_name}.${payload.given_name}`,
                    email: payload.email,
                    password: Math.random().toString()
                },
            });
            const token = signToken({ id: user.id })
            res.status(created ? 201 : 200).json({ access_token: token })
        } catch (error) {
            next(error)
        }
    }
}