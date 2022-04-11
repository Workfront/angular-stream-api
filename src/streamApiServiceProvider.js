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

'use strict';

/**
 * Creates StreamAPI Provider Service instance.
 */
function streamApiServiceProvider() {
    this.$get = streamApiServiceFactory;
}

streamApiServiceFactory.$inject = ['$http', '$httpParamSerializer', '$q'];
function streamApiServiceFactory($http, $httpParamSerializer, $q) {
    var Api = require('./service/Api'),
        Url = require('url-parse'),
        angular = require('angular'),
        factory = {},
        _instance;
        
    Api.prototype.http = $http;
    Api.prototype.serializer = $httpParamSerializer;
    Api.prototype.promise = $q;
    
    factory.getInstance = function(config, requestNewInstance) {
        // In case when config is not provided and _instance is intialized - return it
        if(!config && _instance) {
            return _instance;
        }
        
        if(!(config && angular.isObject(config))) {
            throw new Error('Please provide valid configuration object.');
        }

        if(!(('host' in config) && (typeof config.host === 'string'))) {
            throw new Error('\'config\' should have \'host\' property of type \'string\'');
        }
        
        if(config.host.indexOf('http://') !== 0
        && config.host.indexOf('https://') !== 0) {
            throw new Error('You must provide valid scheme with \'host\'');
        }
        
        var parsedUrl = new Url(config.host);
        if (config.usePath) {
            config.host = parsedUrl.protocol + '//' + parsedUrl.host + parsedUrl.pathname;
        } else {
            config.host = parsedUrl.protocol + '//' + parsedUrl.host;            
        }
        
        if(requestNewInstance) {
            return new Api(config);
        }
        
        if(_instance && isSameOriginAndVersion(config, _instance.config)) {
            return _instance;
        }

        return _instance = new Api(config);
    };

    factory.deleteInstance = function() {
        _instance = undefined;
    };
    
    return factory;
}

function isSameOriginAndVersion(config1, config2) {
    return config1.host === config2.host && config1.version === config2.version;
}

module.exports = function(ngModule) {
    ngModule.provider('streamApiService', streamApiServiceProvider);
};
