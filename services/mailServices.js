const config = require(__dirname + '/../config/config').emailServices;
const fs = require('fs')
const createError = require('http-errors');
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(config.apikey)
module.exports = (to, text) =>{
    const templateHTML = fs.readFileSync(__dirname + '/../views/plantilla_email.html','utf-8')
    const msg = {
        to,
        from: config.from, // Change to your verified sender
        subject: 'Titulo de mail SendGrid',
        text,
        html: templateHTML,
    }
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        throw createError(error.code, error.message)
    })
}