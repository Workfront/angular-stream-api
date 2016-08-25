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

describe('namedQuery', function() {
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
    
    var streamApi,
        requestSpy;
    beforeEach(function() {
        streamApi = streamApiService.getInstance({host: 'https://foo'});
        requestSpy = spyOn(streamApi, 'request').and.callThrough();
    });

    it('should make call by correct url when called with objCode and queryName', function() {
        var requestedUrl = 'https://foo/attask/api-internal/task/namedQuery';
        $httpBackend.expect('GET', requestedUrl)
        .respond(200);
        
        streamApi.namedQuery('task', 'namedQuery');
        expect(requestSpy).toHaveBeenCalledWith('task/namedQuery', undefined, undefined, undefined, streamApi.Methods.GET);
        $httpBackend.flush();
    });

    it('should make call by correct url when called with objCode, queryName and queryArgs', function() {
        var requestedUrl = 'https://foo/attask/api-internal/task/namedQuery?param1=val1&param2=val2';
        var queryArgs = {
            param1: 'val1',
            param2: 'val2'
        };
        
        $httpBackend.expect('GET', requestedUrl)
        .respond(200);
        
        streamApi.namedQuery('task', 'namedQuery', queryArgs);
        expect(requestSpy).toHaveBeenCalledWith('task/namedQuery', undefined, queryArgs, undefined, streamApi.Methods.GET);
        $httpBackend.flush();
    });

    it('should make call by correct url when called with objCode, queryName, queryArgs and fields', function() {
        var requestedUrl = 'https://foo/attask/api-internal/task/namedQuery?fields=f1,f2,f3&param1=val1&param2=val2';
        var queryArgs = {
            param1: 'val1',
            param2: 'val2'
        };
        var fields = [
            'f1',
            'f2',
            'f3'
        ];
        
        $httpBackend.expect('GET', requestedUrl)
        .respond(200);
        
        streamApi.namedQuery('task', 'namedQuery', queryArgs, fields);
        expect(requestSpy).toHaveBeenCalledWith('task/namedQuery', undefined, queryArgs, fields, streamApi.Methods.GET);
        $httpBackend.flush();
    });
});
