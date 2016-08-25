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

describe('execute', function() {
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

    it('should make call to correct url when passed ID', function() {
        var requestedUrl = 'https://foo/attask/api-internal/task/12345678/someAction';
        $httpBackend.expectPUT(requestedUrl)
        .respond(200);
        streamApi.execute('task', '12345678', 'someAction', {});
        
        $httpBackend.flush();
    });

    it('should make call to correct url when not passed ID', function() {
        var requestUrl = 'https://foo/attask/api-internal/task?ID=12345678&action=someAction';
        $httpBackend.expectPUT(requestUrl, undefined, undefined, ['action', 'ID'])
        .respond(200);
        streamApi.execute('task', null, 'someAction', {ID: '12345678'});
        
        $httpBackend.flush();
    });
});
