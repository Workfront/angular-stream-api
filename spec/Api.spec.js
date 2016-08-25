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

/* eslint-env jasmine */
'use strict';

var Api = require('../src/service/Api');
describe('Api', function() {
    var apiKey,
        config,
        sessionId = apiKey = '12345678';

    beforeEach(function() {
        config = {
            host: 'https://foo',
            version: '5.0'
        };
    });

    it('should set option headers to sessionId when passed', function() {
        config.sessionId = sessionId;
        var api = new Api(config);
        expect(api.options.headers.sessionID).toBe(sessionId);
    });

    it('should set option headers to apiKey when passed', function() {
        config.apiKey = apiKey;
        var api = new Api(config);
        expect(api.options.headers.apiKey).toBe(apiKey);
    });

    it('should has Methods property', function() {
        config.apiKey = apiKey;
        var api = new Api(config);
        expect(api.Methods).toBeDefined();
    });

    it('should has Constants property', function() {
        config.apiKey = apiKey;
        var api = new Api(config);
        expect(api.Constants).toBeDefined();
    });
});
