const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose
db.shop = require('./shop.model')(mongoose)
db.product = require('./product.model')(mongoose)

module.exports = db
