const mongoose = require('mongoose')

const BlogPostSchema = new mongoose.Schema({
    category: {
        type: String,
        default: "General",
        required: false
    },
    title: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
    },
    readTime: {
        value: {
            type: Number
        },
        unit: {
            type: String,
            default: "minutes",
        }
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuthorModel'
    },
    content: {
        type: String,
        required: false,
    }

},{ timestamps: true, strict: true })

module.exports = mongoose.model('blogPostModel', BlogPostSchema, 'blogPost')