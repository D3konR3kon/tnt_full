module.exports = app => {
    const shop = require('../controllers/shop.controller.js')

    const router = require('express').Router() 

    router.post('/', shop.create)

    router.get('/', shop.findAll)

    router.get('/:id', shop.findOne)

    router.put('/:id', shop.update)

    router.delete('/:id', shop.delete)

    app.use('/api/shops', router)
}