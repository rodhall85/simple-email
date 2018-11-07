let verifyCalls = [];
let sendMailCalls = [];

module.exports = {
  verifyCalls: verifyCalls,
  sendMailCalls: sendMailCalls,
  createTransport: jest.fn((smtpConfig) => {
    return {
      verify: done => {
        verifyCalls.push(true);
        done(undefined, 'Success' );
      },
      sendMail: (message, done) => {
        sendMailCalls.push(message);
        done(undefined, 'Sent');
      }
    }
  })


}