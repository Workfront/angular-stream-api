'use strict';

function Api(config) {
    var path;
    this.config = config;
    config.version = config.version || 'internal';
    if (config.version === 'internal' || config.version === 'unsupported') {
        path = '/attask/api-' + config.version;
    }
    else {
        path = '/attask/api';
        if (config.version) {
            path = path + '/v' + config.version;
        }
    }

    this.options = {};
    if(config.apiKey) {
        this.options.headers = {apiKey: config.apiKey};
    }
    
    if(config.sessionId) {
        this.options.headers = {sessionID: config.sessionId};
    }
    
    this.options.url = config.host + path;
}

Api.prototype.Constants = require('workfront-api-constants/dist/umd/constants');
Api.prototype.Methods = {
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE',
    POST: 'POST'
};

require('./request')(Api);
require('./get')(Api);
require('./copy')(Api);
require('./count')(Api);
require('./create')(Api);
require('./edit')(Api);
require('./login')(Api);
require('./logout')(Api);
require('./execute')(Api);
require('./search')(Api);
require('./metadata')(Api);
require('./namedQuery')(Api);
require('./report')(Api);
require('./remove')(Api);
require('./getApiKey')(Api);

module.exports = Api;
