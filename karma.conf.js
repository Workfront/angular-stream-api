/* eslint-env node */

// Karma configuration
// Generated on Mon May 23 2016 14:05:11 GMT+0400 (Caucasus Standard Time)
'use strict';

module.exports = function(config) {
    var path = require('path'),
        specs = path.resolve(__dirname, 'spec',  '**', '*.spec.js'),
        angularPath = path.resolve('bower_components', 'angular', 'angular.js'),
        angularMockPath = path.resolve('bower_components', 'angular-mocks', 'angular-mocks.js'),
        preprocessors = {},
        webpackConfig = require('./webpack.config');
        
    webpackConfig.entry = {};
    preprocessors[specs] = ['webpack'];

    config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
        files: [
            angularPath,
            angularMockPath,
            specs
        ],


    // list of files to exclude
        exclude: [
        ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: preprocessors,
        
        webpack: webpackConfig,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


    // web server port
        port: 9876,


    // enable / disable colors in the output (reporters and logs)
        colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
