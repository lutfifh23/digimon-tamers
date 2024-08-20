const gemini = require('../helper/geminiAi')
const { Digimon, User } = require('../models')
module.exports = class Controller {
    static async getAllDigimon(req, res) {
        const digimons = await Digimon.findAll()
        res.status(200).json(digimons)
    }
    static async digimonDetail(req, res, next) {
        try {
            let digimon = await Digimon.findByPk(req.params.id)
            if (!digimon) {
                throw { name: 'DigimonNotFound' }
            }
            res.status(200).json(digimon)
        } catch (error) {
            next(error)
        }
    }
    static async getUser(req, res) {
        const user = await User.findByPk(req.user.id, { include: Digimon })
        console.log(user);
        res.status(200).json(user)
    }
    static async editUser(req, res, next) {
        try {
            let user = await User.findByPk(req.user.id)
            await User.update(req.body, {
                where: {
                    id: req.user.id
                }
            })
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }
    static async deleteUser(req, res, next) {
        try {
            let user = await User.findByPk(req.user.id)
            if (!user) {
                throw { name: 'UserNotFound' }
            }
            await User.destroy({
                where: {
                    id: req.user.id
                }
            })
            res.status(200).json({ message: `profile ${req.user.id} has been deleted` })
        } catch (error) {
            next(error)
        }
    }
    static async openAI(req, res, next) {
        try {
            const { id } = req.params
            let digimon = await Digimon.findByPk(id)
            let detail = await gemini(digimon.name)
            res.status(200).json(detail)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}