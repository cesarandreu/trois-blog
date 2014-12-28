'use strict';

var React = require('react');
var debug = require('debug');
var log = debug('blog:client');
var app = require('./app');

var dehydratedState = window.App; // Sent from the server
window.React = React; // For chrome dev tool support
if (process.env.NODE_ENV !== 'production') {
  debug.enable('*');
}

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
  });
});
