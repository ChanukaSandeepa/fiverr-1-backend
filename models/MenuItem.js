const  mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: "Name is required"
        },
        description: {
            type: String
        },
        photos: [
            {
                text: String,
                createdAt: { type: Date, default: Date.now },
            }
        ],
        price: { type: Number }

    },
    /* don't want to create our indices every time (nice for development, but can result in a performance hit) */
    { autoIndex: false }
);