var jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET
const signToken = (data) => {
    var token = jwt.sign(data, JWT_SECRET);
    return token
}

const verifyToken = (token) => {
    var decoded = jwt.verify(token, JWT_SECRET);
    return decoded
}

module.exports = {
    signToken, verifyToken
}