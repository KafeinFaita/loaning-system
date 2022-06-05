const express = require('express')
const app = express()

const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')


const port = process.env.port || 3000

const dbURI = "mongodb+srv://kafein:kafeinfaita@cluster0.3xefo.mongodb.net/loaning-system?retryWrites=true&w=majority"

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        app.listen(port, () => {
            console.log(`Listening on port ${port}`)
        })
        console.log('Connected to DB!')
    } catch (err) {
        console.log("Connection to DB failed!")
    }
}

connectDB();

app.set('view engine', 'ejs')

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.render('index')
})