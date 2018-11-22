'use strict'

const hsts = require('./hsts')

module.exports = app => {
  const disablePoweredByHeader = () => {
    app.disable('x-powered-by');
  };

  return {
    hsts: hsts(app),
    disablePoweredByHeader: disablePoweredByHeader
  };
};