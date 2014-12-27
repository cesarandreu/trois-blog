'use strict';

/**
 * KOA MODULES
 */
var koa = require('koa'),
  mount = require('koa-mount'),
  serve = require('koa-static'),
  compress = require('koa-compress'),
  responseTime = require('koa-response-time');

/**
 * APPLICATION MODULES
 */
var log = require('debug')('blog:server:log'),
  client = require('./client/middleware'),
  config = require('./config'),
  api = require('./api');

/**
 * APPLICATION
 */
var app = koa();
app.name = config.name;
app.env = config.env;
app.config = config;
app.api = api;

/**
 * GLOBAL MIDDLEWARE
 */
if (app.env === 'development') {
  log('logger enabled');
  app.use(require('koa-logger')()); // request logging
}
app.use(responseTime()); // x-response-time
app.use(compress(config.server.middleware.compress)); // compression
app.use(serve(config.server.assets, config.server.middleware.serve)); // assets

/**
 * APPLICATION
 */
app.use(mount('/api', api));
app.use(mount('/', client({api: api})));

/**
 * INITIALIZER
 *
 * Listens for connections
 * Returns Server
 */
app.init = function init () {
  log('initializing api server');
  app.server = app.listen(config.server.port, function () {
    log('running on port %d', config.server.port);
  });
  return app.server;
};

// auto start if the app is not being initialized by another module
if (!module.parent) {
  log('no parent, calling start');
  app.init();
}

// exports the app so it can be started externally
// you're responsible for starting it
module.exports = app;
