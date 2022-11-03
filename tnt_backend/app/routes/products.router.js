module.exports = function(app) {

    const product = require('../controllers/products.controller.js')
    const { authJwt } = require('../middlewares')

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )

        next()
    })

    // const app = require('express').Router() 

    app.post('/api/menu/:id', [authJwt.verification], product.create)

    app.get('/api/menu/:id/all',product.menu)

    app.get('/api/menu/:id/all/', product.findAll)

    app.get('/api/menu/:id', product.findOne)

    app.put('/api/menu/:id', product.update)

    app.delete('/api/menu/:id', product.delete)

    app.delete('/api/menu/:id/all', product.deleteAll) //Shop id

}