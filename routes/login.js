const express = require('express')
const login = express.Router()
const bcrypt = require('bcrypt')
const authorModel = require("../models/author")
const jwt = require('jsonwebtoken')
require('dotenv').config()

login.post('/login', async (req, res) => {
    const user = await authorModel.findOne({ email: req.body.email })

    if(!user) {
        return res.status(404).send({
            message: "User not found",
            statusCode: 404
        })
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if(!validPassword) {
        return res.status(400).send({
            statusCode: 400,
            message: "Wrong mail or password"
        })
    }

    const token = jwt.sign({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar
    }, process.env.JWT_SECRET, {
        expiresIn: '72h'
    })

    res.header('Authorization', token).status(200).send({
        message: "Login successfully",
        statusCode: 200,
        token
    })
})


module.exports = login;