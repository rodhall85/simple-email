'use strict'

const sendEmail = require('./sendEmail');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.post('/send', (req, res) => {
  sendEmail(req.body);
  res.status(200).send({});
});

module.exports = app;
