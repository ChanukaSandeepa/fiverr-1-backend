const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Experience = require('./models/Experience')
const multer = require('multer')
const bodyParser = require('body-parser')
const formidable = require('express-formidable')

const app = express()

const PORT = process.env.PORT || 8000
const storage = multer.diskStorage({
    dest: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }

})
const URL = 'mongodb+srv://user:12345@cluster0.7pxt3.mongodb.net/imessage?retryWrites=true&w=majority'

mongoose.connect(URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true

})

// app.use(bodyParser.json())
// app.use(express.urlencoded());
// const bodyy = bodyParser.urlencoded({ extended: false })
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(formidable({
    encoding: 'utf-8',
    uploadDir: './uploads',
    multiples: true,
}))

app.post('/test', (req, res) => {
    console.log(req.fields)
    console.log(req.files)
    req.files.images.map(({name}) => {
        console.log(name)
    })
    res.send('<h1>Hello Herokuuu</h1>')
})

app.post('/create', async (req, res) => {
    console.log(req.body)
    const exp = new Experience(req.body)
    const sv = await exp.save()
    console.log(sv)
    res.send({ status: 'success' })
})

app.post('/upload', async (req, res) => {
    console.log(req.body)
    const images = req.files.images.map(({name}) => name)
    console.log(images)
    res.send('done')
})

app.get('/get', async (req, res) => {
    console.log('called')
    const result = await Experience.find({})
    res.send(result)
})

app.get('/get/:id', async (req, res) => {
    console.log(req.params.id)
    const result = await Experience.findById(req.params.id)
    res.send(result)
})

app.listen(PORT, () => {
    console.log('server is listening ' + PORT + ' ')
})