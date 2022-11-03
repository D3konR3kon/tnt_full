module.exports = app => {

    const { verifySignUp } = require('../middlewares')
    const controller = require('../controllers/auth.controller')
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Access",
            "x-access-token, Origin, Content-Type, Accept"
        )

        next()
    })

    app.post("/api/auth/signup", 
    [
        verifySignUp.checkDuplicateNameOrEmail
        // verifySignUp.checkRolesExisted
    ], controller.signup)
    app.post("/api/auth/signin", controller.signin)
}