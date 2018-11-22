'use strict'

const helmet = require('helmet')

module.exports = app => {
  const hsts = (maxAgeSeconds, includeSubdomains, preload) => {
    app.use(helmet.hsts({
      maxAge: (maxAgeSeconds * 1000),
      includeSubdomains: includeSubdomains,
      preload: preload,
      force: true
    }));
  };
  hsts.oneYear = 31557600;
 
  return hsts;
};