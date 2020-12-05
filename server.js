const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Experience = require('./models/Experience')
const multer = require('multer')

const app = express()

const PORT = process.env.PORT || 8000
const upload = multer.diskStorage({
    dest: 'uploads/',
    filename: function (req, file, cb) {
        console.log(file.originalname + '.jpg')
        cb(null,file.originalname + '.jpg');
    }

})
const URL = 'mongodb+srv://user:12345@cluster0.7pxt3.mongodb.net/imessage?retryWrites=true&w=majority'

mongoose.connect(URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true

})

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    console.log("calling from heroku server")
    res.send('<h1>Hello Heroku</h1>')
})

app.post('/create', async (req, res) => {
    console.log(req.body)
    const exp = new Experience(req.body)
    const sv = await exp.save()
    console.log(sv)
    res.send({ status: 'success' })
})

app.post('/upload', upload.array('images'), async (req, res) => {
    let filenames = req.files.map(function (file) {
        return file.filename + '.jpg';
    })
    console.log(filenames)
    res.send({ status: 'success' })
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