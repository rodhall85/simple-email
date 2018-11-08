'use strict'

const sendEmail = require('./sendEmail');
const validatePayload = require('./validatePayload');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.post('/send', (req, res) => {
  if (!validatePayload(req.body)) {
    res.status(400).send({});
    return;
  }

  

  sendEmail(req.body);
  res.status(200).send({});
});

module.exports = app;
