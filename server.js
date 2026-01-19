const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/about-us', (req, res) => {
    res.render('pages/about');
});

app.get('/services', (req, res) => {
    res.render('pages/services');
});

app.get('/careers', (req, res) => {
    res.render('pages/careers');
});

app.get('/contact-us', (req, res) => {
    res.render('pages/contact');
});

app.post('/contact', (req, res) => {
    const { fullName, email, phone, company, country, service, challenges } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'krishnathakur101010@gmail.com',
            pass: 'password'
        }
    });

    const mailOptions = {
        from: 'krishnathakur101010@gmail.com',
        to: 'krishnathakur101010@gmail.com',
        subject: 'New Lead from Website',
        text: `
            Full Name: ${fullName}
            Email: ${email}
            Phone: ${phone}
            Company: ${company}
            Country: ${country}
            Service: ${service}
            Challenges: ${challenges}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Success');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
