'use strict';

var angular = require('angular');
var Url = require('url-parse');

function Api(config) {
    if(!(config && angular.isObject(config))) {
        throw new Error('Please provide valid configuration object.');
    }

    if(!(('url' in config) && (typeof config.url === 'string'))) {
        throw new Error('\'config\' should have \'url\' property of type \'string\'');
    }
    
    if(config.url.indexOf('http://') !== 0
    && config.url.indexOf('https://') !== 0) {
        throw new Error('You must provide valid scheme with \'url\'');
    }
    
    var parsedUrl = new Url(config.url);

    var path;
    if (config.version === 'internal' || config.version === 'unsupported') {
        path = '/attask/api-' + config.version;
    }
    else {
        path = '/attask/api';
        if (config.version) {
            path = path + '/v' + config.version;
        }
    }

    this.baseUrl = parsedUrl.protocol + '//' + parsedUrl.host + path;
}

Api.prototype.Constants = require('./ApiConstants');
Api.prototype.Methods = require('./ApiMethods');

require('./request')(Api);
require('./get')(Api);
require('./copy')(Api);
require('./count')(Api);

module.exports = Api;
