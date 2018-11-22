const request = require('supertest');
const app = require('../../server/app');
const nodemailer = require('nodemailer');
const setup = require('../_setup');

describe('x-powered-by', () => {
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

  it('responds without an X-Powered-By header', function() {
    expect(response.headers['x-powered-by']).toBeUndefined();
  })
});