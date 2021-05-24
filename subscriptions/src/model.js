const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GENDERS = ["M", "F"];

const subscriptionSchema = new Schema({   
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail]
    },
    firstName: {
        type: String,
        required: false
    },
    gender: {
        type: String, 
        enum: GENDERS,
        required: false
    },
    birthDate: {
        type: Date,
        required: true
    },
    consent: {
        type: Boolean,
        required: true
    },
    newsletterId: {
        type: String,
        required: true
    },
});

function validateEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

module.exports = mongoose.model('subscriptions', subscriptionSchema );