/* eslint-env node */

// Karma configuration
// Generated on Mon May 23 2016 14:05:11 GMT+0400 (Caucasus Standard Time)
'use strict';

module.exports = function(config) {
    var configFn = require('./karma.conf.js');
    configFn(config);
    config.set({
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};
