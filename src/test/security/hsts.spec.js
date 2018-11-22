const request = require('supertest');
const app = require('../../server/app');
const nodemailer = require('nodemailer');
const setup = require('../_setup');

describe('HSTS', () => {
  let response; 
  
  beforeAll(async () => {
    setup();

    response = await request(app)
      .post('/emailbev')
      .send({
        'subject': 'Hey you',
        'text': 'some message for you',
        'html': '<p>some message for <strong>you</strong></p>'
      })
  });

  it('responds with an Strict-Transport-Security header', function() {
    expect(response.headers['strict-transport-security']).toEqual('max-age=31557600000')
  })
});