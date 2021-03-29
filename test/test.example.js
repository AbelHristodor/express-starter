/* eslint-disable */
const chai = require('chai');
const chaiHttp = require('chai-http');
const mocha = require('mocha');

const db = require('../src/utils/db');
const app = require('../src/app');
const logger = require('../src/utils/logger');

chai.should();
chai.use(chaiHttp);

before(() => {
    return new Promise((resolve) => {
        db.connection.once('open', () => resolve());
    });
});

describe('API Task', () => {
    describe('Test [METHOD] route [ROUTE]', () => {
        it('Should return ----', (done) => {
            logger.info('[INFO]');
            chai.request(app)
                .get('[ROUTE]')
                .end((err, result) => {
                    result.should.have.status(200);
                    result.body.should.be.a('array');
                    result.body.length.should.not.be.eq(0);
                    done();
                });
        });
    });
});
