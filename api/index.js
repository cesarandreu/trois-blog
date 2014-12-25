'use strict';

// TODO: this could be DI-ified to accept models and config objects
var log = require('debug')('blog:api:log');
log('starting api configuration');

/**
 * API MODULES
 */
 var koa = require('koa'),
  config = require('../config'),
  models = require('../models')(config),
  controllers = require('./controllers');

/**
 * API CONFIG
 */
var api = koa();
api.name = config.api.name;
api.env = config.env;
api.config = config;
api.models = models;
api.controllers = controllers;

/**
 * MIDDLEWARE
 */
api.use(function* addModelsToContext (next) {
  this.models = models;
  yield next;
});

/**
 * CONTROLLERS SETUP
 */
api.use(controllers.middleware());

/**
 * API APPLICATION
 */
log('finished api configuration');
module.exports = api;
