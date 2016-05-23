'use strict';

var angular = require('angular');

var ngModule = angular.module('streamApi', []);

require('./src/ApiServiceProvider')(ngModule);

module.exports = ngModule.name;
