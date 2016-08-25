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

var angular = require('angular');

describe('login', function() {
    beforeEach(function() {
        var ngModule = angular.module('mockModule', []);
        require('./../src/streamApiServiceProvider')(ngModule);
    });

    beforeEach(angular.mock.module('mockModule'));
    
    var streamApiService,
        $httpBackend;
    beforeEach(angular.mock.inject(function(_streamApiService_, _$httpBackend_) {
        streamApiService = _streamApiService_;
        $httpBackend = _$httpBackend_;
    }));
    
    var streamApi;
    beforeEach(function() {
        streamApi = streamApiService.getInstance({host: 'https://foo'});
    });

    it('should make call to correct url', function() {
        var requestedUrl = /https:\/\/foo\/attask\/api-internal\/login/;

        $httpBackend.expectPOST(requestedUrl)
        .respond(200);
        streamApi.login('username', 'password');
        
        $httpBackend.flush();
    });

    it('should store session ID after successful login', function() {
        var requestedUrl = /https:\/\/foo\/attask\/api-internal\/login/;
        var response = {
            data: {
                sessionID: '12345678'
            }
        };

        $httpBackend.expectPOST(requestedUrl, /.*/)
        .respond(200, response);
        streamApi.login('username', 'password');
        
        $httpBackend.flush();
        
        expect(streamApi.options.headers.sessionID).toBe('12345678');
    });
});
