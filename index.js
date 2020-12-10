const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Experience = require('./models/Experience')
const formidable = require('express-formidable')

const app = express()

const PORT = process.env.PORT || 8000

const URL = 'mongodb+srv://user:12345@cluster0.7pxt3.mongodb.net/imessage?retryWrites=true&w=majority'

mongoose.connect(URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true

})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(formidable({
    encoding: 'utf-8',
    uploadDir: './uploads',
    multiples: true,
}))

app.get('/test', (req, res) => {
    
    res.send('<h1>Hello Herokuuu</h1>')
})

app.post('/create', async (req, res) => {
    console.log(req.body)
    const exp = new Experience(req.body)
    const sv = await exp.save()
    console.log(sv)
    res.send({ status: 'success' })
})

app.post('/createExp', async (req, res) => {
    try {
        const { title, description, category, durationType, duration, languages, persons, price, startDate, endDate, included, images, contact, email, siteUrl, address, lat, lng } = req.fields
        const photos = req.files.images.map(({ name }) => name)
        const ex = new Experience({
            rating: 0,
            types: [],
            periods: [],
            category: JSON.parse(category),
            languages: JSON.parse(languages),
            included: JSON.parse(included),
            photos: photos,
            price: price,
            duration: {
                durationType: durationType,
                duration: duration
            },
            dates: {
                startDate: new Date(startDate),
                endDate: new Date(endDate)
            },
            persons: persons,

            name: title,
            address: {
                name: address,
                location: {
                    lat: lat,
                    lng: lng
                }
            },
            phone: contact,
            email: email,
            site: siteUrl,
            about: description
        })
        const exp = await ex.save()
        res.status(201).send(exp)
    } catch (error) {
        res.status(501);
    }
})

app.get('/reservedHours/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { user, dates } = await Experience.findById(id).populate()
        const list = await Experience.find({ 'dates.startDate': { '$gte': dates.startDate }, 'dates.endDate': { '$lte': dates.endDate }, user: user._id })
        const hours = []
        list.map((exp) => {
            exp.times.map((hour) => hours.push(hour))
        })
        res.status(200).send(hours)
    } catch (error) {
        res.status(501)
    }
})

app.get('/addHours/:id', async (req, res) => {
    try {
        const { id } = req.params
        const times = req.body
        const exp = await Experience.findById(id).populate()
        exp.times = times
        const exper = await exp.save()
        res.status(200).send(exper)
    } catch (error) {
        res.status(501)
    }
})

app.get('/get', async (req, res) => {
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
