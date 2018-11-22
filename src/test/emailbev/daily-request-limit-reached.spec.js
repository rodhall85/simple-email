const request = require('supertest');
const app = require('../../server/app');
const nodemailer = require('nodemailer');
const setup = require('../_setup');

describe('send email with daily limit reached', () => {
  let response1, response2; 
  
  beforeAll(async () => {
    setup();    
    process.env.DAILY_REQUEST_LIMIT=1;
    
    response1 = await request(app)
      .post('/emailbev')
      .send({
        'subject': 'Hey you',
        'text': 'some message for you',
        'html': '<p>some message for <strong>you</strong></p>'
    });
    
    response2 = await request(app)
      .post('/emailbev')
      .send({
        'subject': 'Hey you',
        'text': 'some message for you',
        'html': '<p>some message for <strong>you</strong></p>'
      });
  });

  it('should respond with something', () => {
    expect(response1).toBeDefined();
    expect(response2).toBeDefined();
  });

  it('should respond with 200 on the first request', () => {
    expect(response1.status).toBe(200);
  });

  it('should respond with 429 on the second request', () => {
    expect(response2.status).toBe(429);
  });

  it('should not create the message transport', () => {
    expect(nodemailer.createTransport.mock.calls.length).toBe(1);
  });

  it('should not verify the transport', () => {
    expect(nodemailer.verifyCalls.length).toBe(1);
  });

  it('should not call send mail', () => {
    expect(nodemailer.sendMailCalls.length).toBe(1);
  });
});