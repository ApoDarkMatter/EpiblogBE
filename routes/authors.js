const express = require('express')
const AuthorModel = require('../models/author')
const author = express.Router()
const bcrypt = require('bcrypt')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'avatar',
        format: async (req, file) => 'png',
        public_id: (req, file) => file.name,
    },
})

const cloudUpload = multer({storage: cloudStorage})

author.post('/authors/cloudUpload', cloudUpload.single('avatar'), async (req, res) => {
    try {
        res.status(200).json({avatar: req.file.path})
    } catch(e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
})

author.get('/authors', async (req, res) => {
    try {
        const authors = await AuthorModel.find()

        res.status(200).send({
            statusCode: 200,
            authors
        })
    } catch(e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
})

author.get('/authors/:authorId', async (req, res) => {
    const {authorId} = req.params
    try {
        const authors = await AuthorModel.findById(authorId)
        if(!authors){
            return res.status(404).send({
                statusCode:404,
                message: 'Author Not Found'
            })
        }
        res.status(200).send({
            statusCode: 200,
            authors
        })
    } catch(e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
})

author.post('/authors', async (req, res) => {

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newAuthor = new AuthorModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        bornDate: req.body.bornDate,
        avatar: req.body.avatar,
    })

    try {
        const author = await newAuthor.save()

        res.status(201).send({
            statusCode: 201,
            message: 'Author Saved Correctly',
            author
        })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
})

author.patch('authors/:authorId', async (req, res) => {
    const {authorId} = req.params

    const authorExist = await AuthorModel.findById(authorId)

    if(!authorExist) {
        return res.status(404).send({
            statusCode: 404,
            message: 'This Author does not exist'
        })
    }

    try {
        const dataToUpdate = req.body
        const options = {new: true}
        const result = await AuthorModel.findByIdAndUpdate(authorId, dataToUpdate, options)

        res.status(200).send({
            statusCode: 200,
            message: 'Internal Server Error',
            result
        })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
})

author.delete('/authors/:authorId', async (req, res) => {
    const authorId = req.params

    try {
        const author = await AuthorModel.findByIdAndDelete(authorId)
        if(!author) {
            return res.status(404).send({
                statusCode: 404,
                message: "Author not found or already deleted"
            })
        }

        res.status(200).send({
            statusCode: 200,
            message: "Author deleted successfully"
        })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
})

module.exports = author