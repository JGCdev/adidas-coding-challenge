//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let server = require('./index');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('POST email error', () => {
    it('it should GET 500 without sending template', (done) => {
        chai.request(server)
        .post('/subscription')
        .send({})
        .end((err, res) => {
            res.should.have.status(500);
            done();
        });
    });
});

describe('POST email OK', () => {
    it('it should GET 200 code', (done) => {
        chai.request(server)
        .post('/subscription')
        .send({
            email: 'test@gmail.com',
            template: 'deleteSubscription'
        })
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});
