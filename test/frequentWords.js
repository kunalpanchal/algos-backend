const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Frequent Words', () => {
    describe('/GET get-frequent-words', () => {
        it('it should GET the top 90 words', (done) => {
            chai.request(server)
                .get('/get-frequent-words?input=90')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    expect(res.body).to.not.have.property('error');
                    expect(res.body).to.have.property('output');
                    res.body.output.topOccurence.length.should.be.eql(90);
                    done();
                });
        });

        it('it should GET the top 200 words with Redis', (done) => {
            chai.request(server)
                .get('/get-frequent-words?input=200&useRedis=true')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    expect(res.body).to.not.have.property('error');
                    expect(res.body).to.have.property('output');
                    res.body.output.topOccurence.length.should.be.eql(200);
                    done();
                });
        });
    });

});

describe('Frequent Words Errors', () => {
    describe('/GET get-frequent-words', () => {
        it('it should throw error if input param is not sent', (done) => {
            chai.request(server)
                .get('/get-frequent-words')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    expect(res.body).to.have.property('error');
                    expect(res.body.error).to.equal("No input sent");
                    expect(res.body).to.not.have.property('output');
                    done();
                });
        });

        it('it should throw error for invalid possitive input param like -36', (done) => {
            chai.request(server)
                .get('/get-frequent-words?input=-36')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    expect(res.body).to.have.property('error');
                    expect(res.body.error).to.equal("The input recieved is not a valid possitive integer number");
                    expect(res.body).to.not.have.property('output');
                    done();
                });
        });

        it('it should throw error for alphabetic input param hjasdgajsdfhj', (done) => {
            chai.request(server)
                .get('/get-frequent-words?input=hjasdgajsdfhj')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    expect(res.body).to.have.property('error');
                    expect(res.body.error).to.equal("The input recieved is not a valid possitive integer number");
                    expect(res.body).to.not.have.property('output');
                    done();
                });
        });
    });
});