const mongoose = require('mongoose')


const menuSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: "Name is required"
        },
        description: {
            type: String
        },
        courses: [{ type: ObjectId, ref: "Course" }],

    },
    /* don't want to create our indices every time (nice for development, but can result in a performance hit) */
    { autoIndex: false }
);