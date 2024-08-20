function handleError(error, request, response, next) {
    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            error.status = 400
            error.message = error.errors[0].message
            break;
        case "InvalidInput":
            error.status = 400
            error.message = "Email/Password is required"
            break;
        case "InvalidUser":
            error.status = 401
            error.message = "Invalid Email/Password"
            break;
        case "JsonWebTokenError":
        case "Unauthorized":
        case "Unauthenticated":
            error.status = 401
            error.message = "Unauthenticated"
            break;
        case "DigimonNotFound":
        case "UserNotFound":
            error.status = 404
            error.message = `Cuisine not found`
            break;
        case "Forbidden":
            error.status = 403
            error.message = "You are not author"
            break;
        default:
            error.status = 500
            error.message = "Internal Server Error"
            break;
    }
    response.status(error.status).json({
        message: error.message
    })
}
module.exports = handleError