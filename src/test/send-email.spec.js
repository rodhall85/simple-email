const request = require('supertest');
const app = require('../server/app');
const nodemailer = require('nodemailer');

describe('send email', () => {
  let response; 
  
  beforeAll(async () => {
    process.env.SMTP_USERNAME='foo@bar.com';
    process.env.SMTP_PASSWORD='password';
    process.env.SMTP_PORT=1;
    process.env.SMTP_USE_SSL=true;
    process.env.SMTP_HOST='smtp.foo.bar';

    response = await request(app)
      .post('/send')
      .send({
        'to': 'foo@bar.com',
        'subject': 'some message for you',
        'text': 'Hey you',
        'html': '<p>some message for <strong>you</strong></p>'
      })
      .set('Accept', 'application/json');
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
      'subject': 'some message for you',
      'text': 'Hey you',
      'to': 'foo@bar.com',
    }

    expect(actualMessage).toEqual(expectedMessage);
  });
});
