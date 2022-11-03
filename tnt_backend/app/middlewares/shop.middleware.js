const db = require('../models')
const Shop = db.shop

const getShop = async (req, res, next) => {
    let shop
    let id = req.params.id
    try {
        shop = await Shop.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Shop with id " + id });
            else res.send(data);
            })
            .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Shop with id=" + id });
            });

        if(!shop) res.status(404).send({ msg: 'Cannot find the Shop' })
    }catch(err) {
        res.status(500).send({ msg: err.message })
    }
    res.shop = shop
    console.log(res.shop)
    next()
    
}

const shop = {
    getShop
}
module.exports = shop