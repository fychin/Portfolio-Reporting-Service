import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';
import { SERVICE_NAME } from '../src/constants';

describe('Base API Test', () => {
  it('should return healthcheck info', done => {
    request(app)
      .get('/api/health')
      .expect(200)
      .end((err, res) => {
        expect(res.body.service).to.be.equal(SERVICE_NAME);
        expect(res.body.status).to.be.equal('available');
        done();
      })
  });
});