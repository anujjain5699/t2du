const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const crudRoutes = require("./routes/crudRoutes")
const app = express()
const PORT=process.env.PORT || 5000

//dotenv
dotenv.config({ path: '.env' })

// to use encrypted data
app.use(express.urlencoded());

//view engine
app.set('view engine', 'ejs')
app.set('views', './views');

//middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());

//database connection
const dbURI = process.env.MONGOURI
mongoose.connect(dbURI)
    .then(() => {
        let date = new Date();
        app.listen(PORT, () => {
            console.log(`DB connected`)
        })
    })
    .catch(err => console.error(err))

app.use(crudRoutes);