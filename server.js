const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config()
const authorRoute = require('./routes/authors')
const blogPostRoute = require('./routes/blogPosts')
const loginRoute = require('./routes/login')
const commentRoute = require('./routes/comments')
const sendMail = require('./routes/sendMail')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', loginRoute)
app.use('/', authorRoute)
app.use('/', blogPostRoute)
app.use('/', commentRoute)
app.use('/', sendMail)

mongoose.connect(process.env.MONGODB_SERVER_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Error during db connection'))
db.once('open', () => {
    console.log('Database successfully connected')
})

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))