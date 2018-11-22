'use strict'

const nodemailer = require('nodemailer');

function sendEmail(message) {
  let smtpConfig = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_USE_SSL,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
  };

  let transporter = nodemailer.createTransport(smtpConfig);

  transporter.verify((err, success) => {
    if (err) {
      console.log('ERROR', err);
    } else {
      console.log('Ready to send email');
    }
  });

  transporter.sendMail(message, (err, info) => {
    console.log('Result', err || info);
  });
}

module.exports = sendEmail;