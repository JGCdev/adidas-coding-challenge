//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Subscription = require("./model");
let server = require('./index');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let subscriptionId 

// Describe main context
describe('Subscription API Tests', () => {

    /* Before each test clean the collection */
    before((done) => {
        Subscription.deleteMany({}, function(err, result) {
            done();
        });
    });

    describe('GET subscriptions', () => {
        it('it should GET array and 200 status code', (done) => {
            chai.request(server)
            .get('/subscriptions')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });

    describe('GET subscription with error', () => {
        it('it should return error message and status code', (done) => {
            chai.request(server)
            .get('/subscriptions/fakeid')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.not.be.empty;
                done();
            });
        });
    });

    describe('DELETE subscription with error', () => {
        it('it should return error message and status code', (done) => {
            chai.request(server)
            .delete('/subscriptions/fakeid')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.not.be.empty;
                done();
            });
        });
    });

    describe('POST subscription - Validation Error', () => {
        it('it should not POST a subscription without required fields', (done) => {
            chai.request(server)
            .post('/subscriptions')
            .send({})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
        });
    });

    describe('POST subscription', () => {
        it('it should POST a subscription', (done) => {

            let exampleSubscription = {
                email: 'test@gmail.com',
                firstName: 'Jesús',
                gender: 'M',
                birthDate: "1993-05-21T23:57:31.891Z",
                consent: true,
                newsletterId: 'AB1'
            };

            chai.request(server)
            .post('/subscriptions')
            .send(exampleSubscription)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.not.be.empty;
                subscriptionId = res.body.id;
                done();
            });

        });
    });

    describe('POST subscription - Duplicated Error', () => {
        it('it should not POST a duplicated subscription', (done) => {

            let exampleSubscription = {
                email: 'test@gmail.com',
                firstName: 'Jesús',
                gender: 'M',
                birthDate: "1993-05-21T23:57:31.891Z",
                consent: true,
                newsletterId: 'AB1'
            };

            chai.request(server)
            .post('/subscriptions')
            .send(exampleSubscription)
            .end((err, res) => {
                res.should.have.status(409);
                res.body.should.not.be.empty;
                done();
            });

        });
    });

    describe('GET subscription', () => {
        it('it should get last created subscription', (done) => {
            chai.request(server)
                .get('/subscriptions/' + subscriptionId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.not.be.empty;
                    done();
                });
        });
    });

    describe('DELETE subscription', () => {
        it('it should delete subscription', (done) => {
            chai.request(server)
                .delete('/subscriptions/' + subscriptionId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.not.be.empty;
                    done();
                });
        });
    });

});
