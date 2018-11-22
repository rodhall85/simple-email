const request = require('supertest');
const app = require('../../server/app');
const nodemailer = require('nodemailer');
const setup = require('../_setup');

describe('send email with invalid html', () => {
  let response; 
  
  ['', ' ',1,true,[],null].forEach(html => {
    describe(`of '${html}'`, () => {
      beforeAll(async () => {
        setup();    

        response = await request(app)
          .post('/emailbev')
          .send({
            'subject': 'Hey you',
            'text': 'some message for you',
            'html': html
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