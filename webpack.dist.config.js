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

  debug: false,
  devtool: false,

  stats: {
    colors: true,
    reasons: false
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'envify-loader' },
      { test: /\.jsx$/, loader: 'jsx-loader?harmony' }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};

