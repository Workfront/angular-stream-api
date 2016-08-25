/**
 * Copyright 2015 Workfront
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env node */

// Karma configuration
// Generated on Mon May 23 2016 14:05:11 GMT+0400 (Caucasus Standard Time)
'use strict';

var coverage = process.env.NODE_MODE === 'cov',
    ci = process.env.NODE_MODE === 'ci';

module.exports = function(config) {
    var path = require('path'),
        specs = path.resolve('spec', '**', '*.js'),
        angularPath = path.resolve('bower_components', 'angular', 'angular.js'),
        angularMockPath = path.resolve('bower_components', 'angular-mocks', 'angular-mocks.js'),
        preprocessors = {},
        singleRun = ci;
        
    if(ci) {
        console.log('---------- running in CI mode -------------'); // eslint-disable-line no-console
    }

    preprocessors[specs] = 'webpack';

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
        
        webpack: getWebpackConfig(),

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: getReporters(),

        coverageReporter: getCoverageReporterConfig(),

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
        singleRun: singleRun,

    // Concurrency level
    // how many browser should be started simultaneous
        concurrency: Infinity
    });
};

function getReporters() {
    var reporters = ['progress'];
    if(coverage || ci) {
        reporters.push('coverage');
    }

    return reporters;
}

function getCoverageReporterConfig() {
    if(coverage || ci) {
        return {
            dir: 'dist/coverage/',
            subdir: '.',
            reporters: [
                { type: 'lcov'},
                { type: 'text-summary' } 
            ]
        };
    }
}

function getWebpackConfig() {
    var webpackConfig = require('./webpack.config');
    if(coverage || ci) {
        webpackConfig.entry = {};
        webpackConfig.module = webpackConfig.module || {};
        webpackConfig.module.postLoaders = webpackConfig.module.postLoaders || [];
        webpackConfig.module.postLoaders.push(
            { test: /\.js$/i, exclude: /spec|node_modules/, loader: 'istanbul-instrumenter'}
        );
    }
    
    return webpackConfig;
}
