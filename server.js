const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Experience = require('./models/Experience')
const multer = require('multer')

const app = express()

const PORT = process.env.PORT || 8000
const storage = multer.diskStorage({
    dest: 'uploads/',
    filename: function (req, file, cb) {
        cb(null,file.originalname);
    }

})
const URL = 'mongodb+srv://user:12345@cluster0.7pxt3.mongodb.net/imessage?retryWrites=true&w=majority'

mongoose.connect(URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true

})

app.use(express.json())
app.use(express.urlencoded());
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

app.post('/upload', async (req, res) => {
    let upload = multer({ storage: storage}).array('images');
    console.log(req.body)
    console.log(req.params)
    upload(req, res, function(err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        let filenames = req.files.map(function (file) {
            return file.filename;
        })
        console.log(filenames)
        res.send(filenames);
    });
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