const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String
})

experienceSchema.virtual('experiences', {
    ref: 'Experience',
    localField: '_id',
    foreignField: 'user'
})

const User = mongoose.model(schema)

module.exports = User