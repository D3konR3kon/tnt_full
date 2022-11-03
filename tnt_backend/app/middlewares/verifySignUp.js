const db = require('../models')

const Shop = db.shop

const checkDuplicateNameOrEmail = (req, res, next) => {

    Shop.findOne({
        name: req.body.name
    }).exec((err, user) => {
        if(err) {
            res.status(500).send({msg: err})
            return
        }

        if(user) {
            res.status(400).send({msg: 'Failed Shopname is already in use!'})
            return
        }
    })

    Shop.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if(err) {
            res.status(500).send({msg: err})
            return
        }

        if(user) {
            res.status(400).send({msg: 'Failed Email is already in use!'})
            return
        }

        next()
    })

}

const verifySignUp = {
    checkDuplicateNameOrEmail
}

module.exports = verifySignUp

