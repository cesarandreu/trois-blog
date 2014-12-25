'use strict';
var webpack = require('webpack');

module.exports = {
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    entry: './client/index.js',
    output: {
        path: __dirname + '/public/js',
        filename: 'client.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.jsx$/, loader: 'jsx-loader' }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin()
    ]
};
