/* eslint-env node */
'use strict';

var path = require('path');

module.exports = {
    context: __dirname,
    entry: './app.js',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: 'dist',
        filename: 'angular-stream-api.js'
    },
    eslint: {
        configFile: './.eslintrc',
        fix: true
    },
    externals: {
        angular: true
    }
};
