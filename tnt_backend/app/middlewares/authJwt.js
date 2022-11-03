const jwt = require('jsonwebtoken')
const config = require('../config/auth.config.js')


const verifyToken = (req, res, next) => {
    
    let token = req.headers["x-access-token"]

    if(!token) {
        return res.status(403).send({msg: 'No token provided!'})
    }

    jwt.verify(token, config.secrete, (err, decoded) => {
        if(err) {
            return res.status(401).send({ msg: 'Unauthorized!' })
        }
        req.shopId = decoded.id

        next()
    }) 
}

const verification = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.shopId == req.params.id){
            next()
        }else{
            return res.status(404).json({ msg: "You not allowed to do that" })
        }
    })
}


const authJwt = {
    verifyToken,
    verification
}

module.exports = authJwt