const express = require("express");
const mongoose = require("mongoose");
const app = express();
const axios = require('axios');
require("./model");

axios.defaults.baseURL = process.env.EMAIL_SERVICE_URL || 'http://email:3002';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3001;

const Subscription = mongoose.model("subscriptions");
const url = process.env.MONGO_URL || "mongodb://mongo:27017/subscriptions";

mongoose.set('useCreateIndex', true);
mongoose.connect(url, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then( () => {
    console.log("Connection established with Subscriptions");
}).catch( () => {
    console.log("Connection failed");
});

app.post("/subscriptions", (req, res) => {

    const subs = new Subscription(req.body);
    
    subs.save().then((data) => {
        sendEmail(data.email, 'createSubscription');
        res.send({
            id: data._id,
            message: 'Subscription created'
        });
    }).catch((err) => {
        if (err.code === 11000) { return res.status(409).send({message: 'Subscription already exists'}); }
        res.status(400).send({message: 'Validation error'});
    });
});

app.get("/subscriptions", (req, res) => {
    Subscription.find()
    .then((subs) => {
        if (subs) {
            res.send(subs);
        } else {
            res.status(404).send({message: 'Error getting subscriptions'});
        }
    })
    .catch( () => {
        res.status(404).send({message: 'Error getting subscriptions'});
    });
});

app.get("/subscriptions/:id", (req, res) => {
    Subscription.findById(req.params.id)
    .then((subs) => {
        if (subs) {
            res.send(subs);
        } else {
            res.status(404).send({message: 'Subscription not found'});
        }
    })
    .catch( () => {
        res.status(404).send({message: 'Subscription not found'});
    });
});

app.delete("/subscriptions/:id", (req, res) => {
    Subscription.findByIdAndDelete(req.params.id)
    .then((subs) => {
        if (subs) {
            sendEmail(subs.email, 'deleteSubscription');
            res.send( { message: 'Subscription deleted sucessfully' } );
        } else {
            res.status(404).send( { message: 'Subscription does not exist or could not be removed' } );
        }
    })
    .catch( () => {
        res.status(404).send({message: 'Subscription does not exist or could not be removed'});
    });
});

function sendEmail (_email, _template) {

    let emailData = {
        email: _email,
        template: _template
    }

    axios.post(`/subscription`, emailData ).then( () => {
        console.log('Email end OK');
    }).catch( () => {
        console.log('Error sending email, log it');
    })

}

app.listen(port, () => {
    console.log(`Subscriptions service listening on: http://localhost:${port}`);
});

module.exports = app;