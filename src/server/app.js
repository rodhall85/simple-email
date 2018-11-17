'use strict'

const sendEmail = require('./sendEmail');
const validatePayload = require('./validatePayload');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json());

let requests = {'date': new Date(Date.now()).toISOString().split('T')[0], 'count': 0};

app.post('/send', (req, res) => {
  const today = new Date(Date.now()).toISOString().split('T')[0];

  if (requests.date === today) {
    requests.count++;
  }
  else {
    requests.date = today;
    requests.count = 1;
  }

  if (requests.count > process.env.DAILY_REQUEST_LIMIT) {
    res.status(429).send({});
    return;
  }

  if (!validatePayload(req.body)) {
    res.status(400).send({});
    return;
  }

  sendEmail(req.body);
  res.status(200).send({});
});

module.exports = app;
