function setup() {
  process.env.SMTP_USERNAME='foo@bar.com';
  process.env.SMTP_PASSWORD='password';
  process.env.SMTP_PORT=1;
  process.env.SMTP_USE_SSL=true;
  process.env.SMTP_HOST='smtp.foo.bar';
  process.env.EMAIL_ADDRESS_BEV='foo@bar.com'
};

module.exports = setup;