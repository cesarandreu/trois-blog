'use strict';

var React = require('react');
var debug = require('debug');
var log = debug('blog:client');
var app = require('./app');
var ga = require('react-google-analytics');
ga('create', 'UA-20550824-2', 'auto');

var dehydratedState = window.App; // Sent from the server
window.React = React; // For chrome dev tool support
debug.enable('*');

log('rehydrating app');
app.rehydrate(dehydratedState, function (err, context) {
  if (err) {
    throw err;
  }
  window.context = context;
  var mountNode = document.getElementById('app');

  log('React Rendering');
  React.render(app.getAppComponent()({
    context: context.getComponentContext()
  }), mountNode, function () {
    log('React Rendered');
    ga('send', 'pageview');
  });
});
