const mongoose = require('mongoose')

const PostCommentsSchema = new mongoose.Schema({
    rate: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuthorModel'
    }

},{ timestamps: true, strict: true })

module.exports = mongoose.model('PostCommentsModel', PostCommentsSchema, 'postComments')