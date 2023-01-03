//import modules
const express = require('express');
const cors = require('cors')

const app = express();

// const corsOption = {
//     origin: 'http://localhost:8011'
// }


app.use(cors()) //app.use(cors())

app.use(express.json())// app.use(express.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 8000) 



const db = require('./app/models')
const dbConfig = require('./app/config/db.config.js')




db.mongoose.connect(`${dbConfig.db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connected with MongoDB")
    // initial()

    }).catch(err => {
        console.error('Connection error:', err)
        process.exit()
    })



app.get('/', (req, res, next) => {
    res.send('<h1>Hello world<h1>');
})
require('./app/routes/upload.router')(app)
require("./app/routes/auth.router")(app)
require('./app/routes/shop.router')(app)
require('./app/routes/products.router')(app)




app.listen(app.get('port'), () => {
    console.info(`Server listen on port ${app.get('port')}`);
})