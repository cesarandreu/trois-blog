'use strict';

// modules
var fs = require('fs'),
  path = require('path'),
  log = require('debug')('blog:config:log');

// Global config
var config = {
  name: 'trois-blog',
  env: (process.env.NODE_ENV || 'development').toLowerCase()
};

// Load config
fs.readdirSync(__dirname)
.filter(function (file) {
  return (file.indexOf('.') !== 0) && (file !== 'index.js');
})
.forEach(function (file) {
  var name = file.split('.js').shift(),
    configPath = path.join(__dirname, file),
    configuration = require(configPath);

  log('%s config loaded from file %s', name, configPath);
  if (config.env in configuration) {
    // like database.js
    config[name] = configuration[config.env];
    log('using %s environment for %s config', config.env, name);
  } else if (typeof configuration === 'function') {
    // like server.js
    config[name] = configuration(config);
    log('passing %s environment to %s config', config.env, name);
  } else {
    // like api.js
    config[name] = configuration;
    log('%s config resolved itself', name);
  }
});

module.exports = config;
