const request = require('supertest');
const app = require('../server/app');
const nodemailer = require('nodemailer');
const setup = require('./_setup');

describe.only('send email with daily limit reached on the previous day', () => {
  let response1, response2, response3; 
  
  beforeAll(async () => {
    setup();    
    process.env.DAILY_REQUEST_LIMIT=1;

    global.Date.now = jest.fn(() => 1514764800000); // 2018-01-01T00:00:00.000
    
    response1 = await request(app)
      .post('/send')
      .send({
        'to': 'foo@bar.com',
        'subject': 'Hey you',
        'text': 'some message for you',
        'html': '<p>some message for <strong>you</strong></p>'
    });
    
    response2 = await request(app)
      .post('/send')
      .send({
        'to': 'foo@bar.com',
        'subject': 'Hey you',
        'text': 'some message for you',
        'html': '<p>some message for <strong>you</strong></p>'
    });

    global.Date.now = jest.fn(() => 1514851200000); // 2018-01-02T00:00:00.000   

    response3 = await request(app)
      .post('/send')
      .send({
        'to': 'foo@bar.com',
        'subject': 'Hey you',
        'text': 'some message for you',
        'html': '<p>some message for <strong>you</strong></p>'
    });
  });

  it('should respond with something', () => {
    expect(response1).toBeDefined();
    expect(response2).toBeDefined();
    expect(response3).toBeDefined();
  });

  it('should respond with 200 on the first request', () => {
    expect(response1.status).toBe(200);
  });

  it('should respond with 429 on the second request', () => {
    expect(response2.status).toBe(429);
  });

  it('should respond with 200 on the third request', () => {
    expect(response1.status).toBe(200);
  });

  it('should not create the message transport', () => {
    expect(nodemailer.createTransport.mock.calls.length).toBe(2);
  });

  it('should not verify the transport', () => {
    expect(nodemailer.verifyCalls.length).toBe(2);
  });

  it('should not call send mail', () => {
    expect(nodemailer.sendMailCalls.length).toBe(2);
  });
});