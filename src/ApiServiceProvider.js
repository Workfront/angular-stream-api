'use strict';

/**
 * Creates StreamAPI Provider Service instance.
 */
function streamApiServiceProvider() {
    this.$get = streamApiServiceFactory;
}

streamApiServiceFactory.$inject = ['$http', '$q'];
function streamApiServiceFactory($http, $q) {
    var Api = require('./service/Api'),
        factory = {},
        _instance;
        
    Api.prototype.http = $http;
    Api.prototype.promise = $q;
    
    factory.getInstance = function(config, returnNewInstance) {
        if(returnNewInstance) {
            return new Api(config);
        }
        
        if(!_instance) {
            _instance = new Api(config); 
        }

        return _instance;
    };

    factory.deleteInstance = function() {
        _instance = undefined;
    };
    
    return factory;
}

module.exports = function(ngModule) {
    ngModule.provider('streamApiService', streamApiServiceProvider);
};
