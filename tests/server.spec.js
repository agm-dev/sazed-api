const request = require('supertest');
const server = require('../src/config/server');

describe('GET /status', () => {
  it('should return 200 { status: "OK" }', (done) => {
    request(server)
      .get('/status')
      .expect(200, { status: 'OK' })
      .end(done);
  });
});
