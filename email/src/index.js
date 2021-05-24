const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3002;

const emailTemplates = [
    {
        name: 'createSubscription',
        subject: 'You have subscribed sucessfully',
        html: `<h1>You have subscribed sucessfully</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
        <p>Adidas Team</p>`
    },
    {
        name: 'deleteSubscription',
        subject: 'Subscription successfully deleted',
        html: `<h1>Subscription successfully deleted</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
        <p>Adidas Team</p>`
    },
];

app.post("/subscription", (req, res) => {
    try {
        let template = emailTemplates.filter( element => {
            return element.name === req.body.template
        });

        sendEmailWithSomeLibrary(req.body.email, template[0].subject, template[0].html);
        res.send('OK');

    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Email service listening on: http://localhost:${port}`);
});

function sendEmailWithSomeLibrary(to, subject, html) {
    console.log('Email sent to : ', to);
}

module.exports = app;