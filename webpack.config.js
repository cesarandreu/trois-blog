'use strict';
var webpack = require('webpack'),
  path = require('path');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, '/public/assets'),
    publicPath: '/assets/',
    filename: 'application.js'
  },

  cache: true,
  debug: true,
  devtool: '#inline-source-map',

  stats: {
    colors: true,
    reasons: true
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'envify-loader' },
      { test: /\.jsx$/, loader: 'jsx-loader?harmony' }
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
