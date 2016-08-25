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

describe('copy', function() {
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
    
    it('should throw an error when objCode is not provided', function() {
        expect(function() {
            streamApi.copy(undefined, '12345678');
        }).toThrow(new Error('You must provide at least objCode and objID'));
    });
    
    it('should throw an error when objID is not provided', function() {
        expect(function() {
            streamApi.copy('task', undefined);
        }).toThrow(new Error('You must provide at least objCode and objID'));
    });

    it('should make call to correct url with correct data and headers', function() {
        var requestedUrl = 'https://foo/attask/api-internal/task?copySourceID=12345678&fields=*';
        var headerData = function(headers) {
            return headers['Content-Type'] === 'application/json;charset=utf-8';
        };
        
        $httpBackend.expectPOST(requestedUrl, {name:'copied task'}, headerData)
        .respond(200);
        
        streamApi.copy('task', '12345678', {name:'copied task'}, '*');
        
        $httpBackend.flush();
    });
});
