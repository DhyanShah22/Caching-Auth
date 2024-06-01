const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))

app.get("/", (req,res) => {
    res.send("<h1> Hello Helmet!!!</h1>")
})

app.use((req, res, next) => {
    console.log(req.path, req.method)
})

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen((process.env.PORT), () => {
            console.log('Connected to DB and listening to port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })