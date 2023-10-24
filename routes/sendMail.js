const express = require('express')
const {createTransport} = require('nodemailer')
const email = express.Router()


const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'carey83@ethereal.email',
        pass: '82MFs2sJ6ud7a8SwXX'
    }
});


email.post('/send-email', async (req, res) => {
    const { subject, text } = req.body

    const mailOptions = {
        from: 'noreply@epiblog.com',
        to: 'carey83@ethereal.email',
        subject,
        text
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error)
            res.status(500).send('Errore durante invio mail')
        } else {
            console.log('email inviata!')
            res.status(200).send('Email inviata correttamente')
        }
    })

})

module.exports = email