'use strict';

var angular = require('angular');

var ngModule = angular.module('streamApi', []);
require('./streamApiServiceProvider')(ngModule);
module.exports = ngModule;
