const { User } = require('../models');
async function authorization(request, response, next) {
    let userId = request.user.id
    try {
        let user = await User.findByPk(userId);
        if (user.role !== "admin") {
            if (user.id !== userId) {
                throw { name: "Forbidden" }
            }
        }
        next()
    } catch (error) {
        console.log(error)
    }
}
module.exports = authorization