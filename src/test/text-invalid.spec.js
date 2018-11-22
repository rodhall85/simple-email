const request = require('supertest');
const app = require('../server/app');
const nodemailer = require('nodemailer');
const setup = require('./_setup');

describe('send email with invalid text', () => {
  let response; 
  
  ['', ' ',1,true,[],null].forEach(text => {
    describe(`of '${text}'`, () => {
      beforeAll(async () => {
        setup();    

        response = await request(app)
          .post('/emailbev')
          .send({
            'subject': 'Hey you',
            'text': text,
            'html': '<p>some message for <strong>you</strong></p>'
          });
      });

      it('should respond with something', () => {
        expect(response).toBeDefined();
      });

      it('should respond with 400', () => {
        expect(response.status).toBe(400);
      });

      it('should not create the message transport', () => {
        expect(nodemailer.createTransport.calls).toBeUndefined();
      });

      it('should not verify the transport', () => {
        expect(nodemailer.verifyCalls.length).toBe(0);
      });

      it('should not call send mail', () => {
        expect(nodemailer.sendMailCalls.length).toBe(0);
      });
    });
  });
});