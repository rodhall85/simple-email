const request = require('supertest');
const app = require('../server/app');
const nodemailer = require('nodemailer');
const setup = require('./_setup');

describe('send email', () => {
  let response; 
  
  beforeAll(async () => {
    setup();

    response = await request(app)
      .post('/send')
      .send({
        'to': 'foo@bar.com',
        'subject': 'Hey you',
        'text': 'some message for you',
        'html': '<p>some message for <strong>you</strong></p>'
      })
  });

  it('should respond with something', () => {
    expect(response).toBeDefined();
  });

  it('should respond with 200', () => {
    expect(response.status).toBe(200);
  });

  it('should create the message transport with the correct config', () => {
    const expectedSmtpConfig = {
      "auth": {
        "pass": "password",
        "user": "foo@bar.com",
      },
      "host": "smtp.foo.bar",
      "port": "1",
      "secure": "true",
    };

    expect(nodemailer.createTransport.mock.calls.length).toBe(1);
    expect(nodemailer.createTransport).toHaveBeenCalledWith(expectedSmtpConfig);
  });

  it('should verify the transport', () => {
    expect(nodemailer.verifyCalls.length).toBe(1);
  });

  it('should call send mail once', () => {
    expect(nodemailer.sendMailCalls.length).toBe(1);
  });

  it('should call send mail with the correct message', () => {
    const actualMessage = nodemailer.sendMailCalls[0];
    const expectedMessage = {
      'html': '<p>some message for <strong>you</strong></p>',
      'subject': 'Hey you',
      'text': 'some message for you',
      'to': 'foo@bar.com',
    }

    expect(actualMessage).toEqual(expectedMessage);
  });
});
