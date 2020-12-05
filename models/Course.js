const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: "Name is required"
        },

        menuItem: [{ type: ObjectId, ref: "MenuItem" }],

        photo: { type: string }

    },
    /* don't want to create our indices every time (nice for development, but can result in a performance hit) */
    { autoIndex: false }
);