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

describe('logout', function() {
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
        var requestedUrl = /https:\/\/foo\/attask\/api-internal\/logout/;

        $httpBackend.expectGET(requestedUrl)
        .respond(200);
        streamApi.logout();
        
        $httpBackend.flush();
    });

    it('should remove from headers', function(done) {
        var data = {
            data: {
                success: true
            }
        };
        $httpBackend.expectGET()
        .respond(200, data);
        var sessionID = '12345678';
        streamApi.options.headers = {sessionID: sessionID};
        streamApi.logout()
        .then(function() {
            expect(streamApi.options.headers).toBeUndefined();
            done();
        });
        
        $httpBackend.flush();
    });

    it('should not remove headers and should reject promise if request doesn\'t contain success: true', function(done) {
        var data = {};
        $httpBackend.expectGET()
        .respond(200, data);
        var sessionID = '12345678';
        streamApi.options.headers = {sessionID: sessionID};
        streamApi.logout()
        .catch(function() {
            expect(streamApi.options.headers.sessionID).toBe(sessionID);
            done();
        });
        
        $httpBackend.flush();
    });

    it('should not do anything', function(done) {
        
        $httpBackend.expectGET()
        .respond(500);
        var sessionID = '12345678';
        streamApi.options.headers = {sessionID: sessionID};
        streamApi.logout()
        .catch(function() {
            expect(streamApi.options.headers.sessionID).toBe(sessionID);
            done();
        });
        
        $httpBackend.flush();
    });
});
