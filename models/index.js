'use strict';

// modules
var fs = require('fs'),
  path = require('path'),
  Sequelize = require('sequelize'),
  log = require('debug')('blog:models:log');

// Load and initialize models
// expects opts.database
module.exports = function initializeModels (opts) {
  if (!opts || !opts.database) {
    throw new Error('models initializer expects opts.database');
  }
  var config = opts.database;
  var sequelize = new Sequelize(config.database, config.username, config.password, config);

  // Load models
  var db = {};
  fs.readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function (file) {
    var modelPath = path.join(__dirname, file),
      model = sequelize.import(modelPath);
    db[model.name] = model;
    log('%s loaded from file %s', model.name, modelPath);
  });

  // Associate models
  Object.keys(db)
  .forEach(function (modelName) {
    if ('associate' in db[modelName]) {
      log('calling associate on %s', modelName);
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  return db;
};
