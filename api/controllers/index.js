'use strict';

// modules
var fs = require('fs'),
  path = require('path'),
  compose = require('koa-compose'),
  log = require('debug')('blog:api:controllers:log');

// Load controllers
var controllers = {};
fs.readdirSync(__dirname)
.filter(function (file) {
  return (file.indexOf('.') !== 0) && (file !== 'index.js');
})
.forEach(function (file) {
  var name = file.split('_controller.js').shift(),
    controllerPath = path.join(__dirname, file);
  module.exports[name] = controllers[name] = require(controllerPath);
  log('%s loaded from file %s', name, controllerPath);
});
log('controllers finished loading');

// Get all controller middleware
controllers.middleware = function middleware () {
  var controllerMiddleware = Object.keys(controllers)
  .filter(function (name) {
    return name !== 'middleware';
  })
  .map(function (name) {
    log('%s controller middleware initializing', name);
    return controllers[name]();
  });
  log('controller middleware complete');
  return compose(controllerMiddleware);
};

module.exports = controllers;
