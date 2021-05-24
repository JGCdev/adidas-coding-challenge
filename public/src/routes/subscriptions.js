const express = require("express");
const router = express.Router();
const axios = require('axios');

axios.defaults.baseURL = 'http://subscriptions:3001/subscriptions';

// Get All Subscriptions
router.route('/').get( (req, res, next) => {
    axios.get(`/`).then(result => {
        res.status(200).send(result.data);
    }).catch(err => {
        res.status(err.response.status).send(err.response.data);
    })
})

// Get Subscription by ID
router.route('/:id').get( (req, res, next) => {
    axios.get(`/${req.params.id}`).then(result => {
        res.status(200).send(result.data);
    }).catch(err => {
        res.status(err.response.status).send(err.response.data);
    })
})

// Delete Subscription by ID
router.route('/:id').delete( (req, res, next) => {
    axios.delete(`/${req.params.id}`).then( result => {
        res.status(200).send(result.data)
    }).catch(err => {
        res.status(err.response.status).send(err.response.data);
    })
})

// Post Subscription
router.route('/').post( (req, res, next) => {
    axios.post(`/`, req.body ).then(result => {
        res.status(200).send(result.data)
    }).catch(err => {
        res.status(err.response.status).send(err.response.data);
    })
})

module.exports = router;