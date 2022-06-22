const express = require('express')
const app = express()

const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const getRoutes = require('./routes/getRoutes')
const postRoutes = require('./routes/postRoutes')
const putPatchRoutes = require('./routes/putPatchRoutes')
const deleteRoutes = require('./routes/deleteRoutes')

const { displayUsername } = require('./controllers/middleware')

const port = process.env.PORT || 3000

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

app.use(express.static(__dirname + "/public"))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.get('*', displayUsername)
app.use(getRoutes)
app.use(postRoutes)
app.use(putPatchRoutes)
app.use(deleteRoutes)
app.get('*', (req, res) => {
    res.send('404')
})



