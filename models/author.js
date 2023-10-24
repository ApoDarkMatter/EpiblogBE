const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    bornDate: {
        type: String,
        required: false,  
    },
    avatar: {
        type: String,
        required: false,
        default: 'https://cdn2.vectorstock.com/i/1000x1000/38/31/male-face-avatar-logo-template-pictograph-vector-11333831.jpg',
    }
},{ timestamps: true, strict: true })

module.exports = mongoose.model('AuthorModel', AuthorSchema, 'author')