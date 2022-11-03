const config = require('../config/auth.config')
const db = require('../models')
const Shop = db.shop
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.signup = (req, res) => {
    const shop = new Shop({

        name: req.body.name,
        email: req.body.email,
        img: req.body.img,
        password: bcrypt.hashSync(req.body.password, 10)
    })

    shop.save((err, shop) => {

        if(err) {
            res.status({ msg: err })
            return
        }
        res.send(shop)

        
    })
}

exports.signin = (req, res) => {

    Shop.findOne({
        name: req.body.name
    })
    // .populate("roles", "-__v")
    .exec((err, shop) => {
        if(err){
            res.status(500).send({ msg: err})
            return
        }
        if(!shop){
            return res.status(404).send({ msg: "Shop not found!" })
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password, shop.password)
        if(!passwordIsValid){
            return res.status(401).send({
                accessToken: null,
                msg: "Invalid Password"
            })
        }
        let token = jwt.sign({ id: shop.id}, config.secrete, {
            expiresIn: 86400
        })
        // console.log(user.roles)
        // let authorities = []
        // for(let i = 0; i < user.roles.length; i++){
        //     authorities.push("Role_"+user.roles[i].name.toUpperCase())
        // }
        res.status(200).send({
            id: shop._id,
            name: shop.name,
            email: shop.email,
            // roles: authorities,
            accessToken: token
        })
    })
}