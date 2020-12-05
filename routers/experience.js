const express = require('express')
const { default: Experience } = require('../models/Experience')

const router =  new express.Router()

router.post('/createExperience', (req, res) => {
    try {
        const { title, description, duration, price, maximunGropSize, languages, categories, included, image, contact, siteUrl, email, address  } = res.body
        const exp = new Experience({
            periods: { type: Array, "default": [] },
            category: { type: Array, "default": [] },
            languages: { type: Array, "default": [] },
            included: { type: Array, "default": [] },
            photos: { type: Array, "default": [] },
            price: {
                type: Number,
                trim: true
            },
            rating: {
                type: Number
            },
            duration: { type: Number },
    
            name: {
                type: String,
                trim: true,
                required: "Nome è un campo obbligatorio"
            },
            address: {
                type: String,
                trim: true,
                required: "Indirizzo è un campo obbligatorio"
            },
            phone: {
                type: String,
                trim: true,
                required: "Il numero di telefono è un campo obbligatorio"
            },
            email: {
                type: String,
                trim: true,
                required: "Email è un campo obbligatorio"
            },
            site: {
                type: String,
                trim: true,
            },
    
            images: [{
                type: String
            }],
            about: {
                type: String,
                trim: true
            }
        })
    } catch (error) {
        
    }
})