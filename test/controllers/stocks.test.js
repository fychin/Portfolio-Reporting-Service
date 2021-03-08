import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/app';

describe('Stocks Controller Test', () => {
  it('should return data for the stock requested', done => {
    const ticker = 'ILMN';
    request(app)
      .get(`/api/stocks/${ticker}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body.symbol).to.be.equal(ticker);
        done();
      });
  });

  it('should include report properties "date" and "closePrice"', done => {
    const ticker = 'ILMN';
    request(app)
      .get(`/api/stocks/${ticker}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body.report).to.have.property('date');
        expect(res.body.report).to.have.property('closePrice');
        done();
      });
  });
});