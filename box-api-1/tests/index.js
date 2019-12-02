let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('/src/');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

describe('Test Case', () => {
    it("should have the correct response", (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                expect({
                    server: 'api-1',
                    message: 'Hello, world!',
                    error: false,
                }).to.deep.equal(res.body);
                expect(1).to.equal(2);
                done();
            });
    });
});
