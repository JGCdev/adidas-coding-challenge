const express = require('express');
const app = express();
const helmet = require("helmet"); // basic security headers middleware

const port = process.env.PORT || 3000;

// SERVICES
const subscriptionApi = require('./routes/subscriptions');

// MIDDLEWARES
const rateLimiter = require( './middlewares/rateLimiter');

app.use(rateLimiter);
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ROUTE MAPPING
app.use('/api/subscriptions', subscriptionApi);

app.listen(port, () => {
    console.log(`Public service listening on: http://localhost:${port}`);
})

module.exports = app;