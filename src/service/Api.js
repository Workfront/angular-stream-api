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

    if(config.headers) {
        this.options.headers = {};
        for (var key in config.headers) {
            if (config.headers.hasOwnProperty(key)) {
                this.options.headers[key] = config.headers[key];
            }
        }
    }

    if(config.apiKey) {
        this.options.headers = this.options.headers || {};
        this.options.headers.apiKey = config.apiKey;
    }

    if(config.sessionId) {
        this.options.headers = this.options.headers || {};
        this.options.headers.sessionID = config.sessionId;
    }

    this.options.url = config.host + path;
}

Api.prototype.Constants = require('workfront-api-constants');
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
