'use strict';

streamApiServiceFactory.$inject = ['$http', '$q'];
function streamApiServiceFactory($http, $q) {
    var Api = require('./Api'),
        _instance,
        factory = {};
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

module.exports = streamApiServiceFactory;
