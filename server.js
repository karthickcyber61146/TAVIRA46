const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'youremail@gmail.com',  // Your Gmail
        pass: 'yourapppassword'      // App password
    }
});

app.post('/contact', (req, res) => {
    const {name,email,message} = req.body;
    const mailOptions = {
        from: email,
        to: 'youremail@gmail.com',
        subject: `New Contact Form Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) res.json({success:false,error:err.message});
        else res.json({success:true});
    });
});

app.listen(3000,()=>console.log('Server running on port 3000'));

