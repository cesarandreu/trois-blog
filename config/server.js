'use strict';

// modules
var path = require('path'),
  _ = require('lodash');

/**
 * SERVER CONFIGURATION
 */
var server = {
  assets: path.resolve(__dirname, '../public'),
  middleware: {
    serve: {}
  }
};

/**
 * PER ENVIRONMENT CONFIGURATION
 */
var environments = {
  development: {
    port: 3000
  },
  test: {
    port: 4000
  },
  production: {
    port: process.env.PORT || 3000,
    middleware: {
      serve: {
        maxage: 1000 * 60 * 60 * 24 // 24hrs
      }
    }
  }
};

module.exports = function serverConfig (config) {
  if (!environments[config.env]) {
    throw new Error('invalid server environment "' + config.env + '"');
  }
  return _.merge(server, environments[config.env]);
};
