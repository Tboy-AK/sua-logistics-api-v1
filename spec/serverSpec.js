const request = require('postman-request');
require('../server');

describe('GET /', () => {
  const response = {};
  beforeAll(async (done) => {
    request(`http://localhost:${process.env.PORT || 3000}/`, (err, res, body) => {
      response.status = res.statusCode;
      response.body = body;
      done();
    });
  });

  it('gets status 200', async (done) => {
    const resStatus = await response.status;
    expect(resStatus).toEqual(200);
    done();
  });
});
