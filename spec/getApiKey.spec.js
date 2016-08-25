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

describe('getApiKey', function() {
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

    it('should set correct apiKey in config headers on successful login', function(done) {
        var key = '12345678';
        var response = {
            data: { result: key }
        };
        $httpBackend.expectPUT()
        .respond(200, response);
        streamApi.getApiKey('foo', 'bar')
        .then(function() {
            expect(streamApi.options.headers['apiKey']).toBe(key);
            done();
        });
        
        $httpBackend.flush();
    });

    it('should make call by correct urls when first call doesn\'t return valid apiKey' , function() {
        var requestedUrl1 = 'https://foo/attask/api-internal/user?action=getApiKey&password=bar&username=foo';
        var requestedUrl2 = 'https://foo/attask/api-internal/user?action=generateApiKey&password=bar&username=foo';

        $httpBackend.expectPUT(requestedUrl1)
        .respond(200);

        $httpBackend.expectPUT(requestedUrl2)
        .respond(200);
        
        streamApi.getApiKey('foo', 'bar');
        $httpBackend.flush();
    });

    it('should make call and resolve returned promise to apiKey on successful login', function(done) {
        var key = '12345678';
        var response = {
            data: { result: key }
        };
        $httpBackend.expectPUT()
        .respond(200, response);
        streamApi.getApiKey('foo', 'bar')
        .then(function(result) {
            expect(result.data).toEqual(response);
            done();
        });
        
        $httpBackend.flush();
    });

    it('should called execute once', function() {
        var execute = spyOn(streamApi, 'execute').and.callFake(function() {
            return streamApi.promise.resolve();
        });
        streamApi.getApiKey('foo', 'bar');
        
        expect(execute).toHaveBeenCalledTimes(1);
    });

    it('should called execute with correct args', function() {
        var execute = spyOn(streamApi, 'execute').and.callFake(function() {
            return streamApi.promise.resolve();
        });
        
        
        var username = 'foo',
            passowrd = 'bar',
            params = {
                username: username,
                password: passowrd
            };
        streamApi.getApiKey(username, passowrd);
        
        expect(execute).toHaveBeenCalledWith('user', undefined, 'getApiKey', params);
    });
});
