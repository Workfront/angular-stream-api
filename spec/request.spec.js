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

describe('request', function() {
    
    beforeEach(function() {
        var ngModule = angular.module('mockModule', []);
        require('./../src/streamApiServiceProvider')(ngModule);
    });

    beforeEach(function() {
        angular.mock.module('mockModule');
    });

    var streamApiService,
        $httpBackend;
    beforeEach(function() {
        angular.mock.inject(function(_streamApiService_, _$httpBackend_) {
            streamApiService = _streamApiService_;
            $httpBackend = _$httpBackend_;
        });
    });
    
    var streamApi;
    beforeEach(function() {
        streamApi = streamApiService.getInstance({host:'http://foo'});
    });

    it('should setup httpConfig correctly when passed task as path and method', function() {
        streamApi.request('task', null, null, null, streamApi.Methods.GET);
        expect(streamApi.httpConfig.url).toBe('http://foo/attask/api-internal/task');
        expect(streamApi.httpConfig.method).toBe(streamApi.Methods.GET);
    });

    it('should set correct url when passed /task as path', function() {
        streamApi.request('task', null, null, null, streamApi.Methods.GET);
        expect(streamApi.httpConfig.url).toBe('http://foo/attask/api-internal/task');
    });

    it('should throw when not passed data on method POST', function() {
        expect(function() {streamApi.request('task', null, null, null, streamApi.Methods.POST);})
            .toThrow(new Error('You must specify \'data\' in case you have used POST'));
    });

    it('should throw when passed data and method not equal to POST or PUT', function() {
        expect(function() {streamApi.request('task', {}, null, null, streamApi.Methods.GET);})
            .toThrow(new Error('You must specify method PUT or POST in case you have passed \'data\''));
    });

    it('should set httpConfig.headers to Content-Type: application/json when method is POST', function() {
        streamApi.request('task', {}, null, null, streamApi.Methods.POST);
        expect(streamApi.httpConfig.headers['Content-Type']).toBe('application/json;charset=utf-8');
    });

    it('should add to httpConfig.headers Content-Type: application/json when method is PUT', function() {
        streamApi.request('task', {}, null, null, streamApi.Methods.PUT);
        expect(streamApi.httpConfig.headers['Content-Type']).toBe('application/json;charset=utf-8');
    });

    it('should add to httpConfig.headers sessionID from \'data\' when logged in and will use it for subsequent calls', function(done) {
        var sessionID = '12345678';
        var loginData = {
            data: {
                sessionID: sessionID
            }
        };
        $httpBackend.whenPOST()
        .respond(200, loginData);
        $httpBackend.whenGET()
        .respond(200);
        $httpBackend.whenGET()
        .respond(200);
        streamApi.login('username', 'password')
        .then(function(data) {
            expect(streamApi.options.headers.sessionID).toBe(data.data.sessionID);
            streamApi.request('task', undefined, undefined, undefined, streamApi.Methods.GET);
            expect(streamApi.httpConfig.headers.sessionID).toBe(sessionID);
            streamApi.request('task', undefined, undefined, undefined, streamApi.Methods.GET);
            expect(streamApi.httpConfig.headers.sessionID).toBe(sessionID);
            done();
        });

        $httpBackend.flush();
    });

    it('should copy options.headers property to httpConfig.headers', function() {
        var passedHeaders =  {someprop: 'somevalue'};
        streamApi.options.headers = passedHeaders;
        $httpBackend.whenPOST()
        .respond(function(method, url, data, headres) {
            expect(headres.someprop).toEqual(passedHeaders.someprop);
            return {};
        });
        streamApi.request('url', {}, {}, undefined, streamApi.Methods.POST);
        $httpBackend.flush();
    });

    it('should send params in POST request as data in body when url is longer than 2000', function() {
        var longParams = {
            'ewsCredentials': {
                'ewsID':'AAMkADI0MTZkOTE3LWNkZDItNGVmNC04ZDIxLWZlOWU1YTJmYmIyOQBGAAAAAACoSXYdZ8juQK7Vqjdn60EpBwAKEvyJ/6KYSLziaZ29LGlPAAAAAAEMAAAKEvyJ/6KYSLziaZ29LGlPAAA1EsrAAAA=',
                'ewsUrl':'https://outlook.office365.com/EWS/Exchange.asmx',
                'attachmentToken':'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkkzTDVfM3pTRVZPT3RmQmZFTGpXRmMwaFNwWSJ9.eyJpc3MiOiIwMDAwMDAwMi0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDBANzBiMzdjZWQtMjkzOS00OTE2LThkMTMtZTg0NzQzN2U1ZWM5IiwiYXVkIjoiMDAwMDAwMDItMDAwMC0wZmYxLWNlMDAtMDAwMDAwMDAwMDAwL291dGxvb2sub2ZmaWNlMzY1LmNvbUA3MGIzN2NlZC0yOTM5LTQ5MTYtOGQxMy1lODQ3NDM3ZTVlYzkiLCJuYmYiOjE0NzA4MjQ0MjMsImV4cCI6MTQ3MDgyNDcyMywibmFtZWlkIjoiZDk4NWUwNWYtMDUzNS00ZmY5LWE2NDQtOTlhMDhmNTNjYzQxQDcwYjM3Y2VkLTI5MzktNDkxNi04ZDEzLWU4NDc0MzdlNWVjOSIsInZlciI6IkV4Y2hhbmdlLkNhbGxiYWNrLlYxIiwiYXBwY3R4c2VuZGVyIjoiaHR0cHM6Ly9vMzY1LmF0dGFzay1vbmRlbWFuZC5jb20vYXBwcmVhZC9pbmRleC5odG1sQDcwYjM3Y2VkLTI5MzktNDkxNi04ZDEzLWU4NDc0MzdlNWVjOSIsImFwcGN0eCI6IntcIm9pZFwiOlwiNzg4NDY1YzgtYWUzOC00NzEzLWFlZWUtMDlkYmE5MDU5NjlmXCIsXCJwdWlkXCI6XCIxMDAzM0ZGRjk2MDFDNjRBXCIsXCJzbXRwXCI6XCJhZG1pbkB3b3JrZnJvbnRpbmMub25taWNyb3NvZnQuY29tXCIsXCJ1cG5cIjpcImFkbWluQHdvcmtmcm9udGluYy5vbm1pY3Jvc29mdC5jb21cIixcInNjb3BlXCI6XCJQYXJlbnRJdGVtSWQ6QUFNa0FESTBNVFprT1RFM0xXTmtaREl0TkdWbU5DMDRaREl4TFdabE9XVTFZVEptWW1JeU9RQkdBQUFBQUFDb1NYWWRaOGp1UUs3VnFqZG42MEVwQndBS0V2eUovNktZU0x6aWFaMjlMR2xQQUFBQUFBRU1BQUFLRXZ5Si82S1lTTHppYVoyOUxHbFBBQUExRXNyQUFBQT1cIn0ifQ.WS1q_Dj-YDrWEJud6ZFpBHKyIjmDNNpqt__-4Eg8XYDn73bN3NkTcDMrzd8ugD1bqxNxWtSZWyymntbAvHuX8p4TyoDyAcu8HzZjWEf2kaI6e3MZi9cNV6ZUo3OhkvQHje1vIZk6rjuRaA0m6O0OiXfKVByoxO-O11Wg9dxSlHL9RkyiqFI_7QkiEWXqlXycAkvUtaV3hkC66pD-sgFILyqNl_hEa-8OIE1bkNTx0gu-rOjSSA39w1V9lMvvhW_ixCtXvUHmowHeVZAm7KWxFNpxamzN0J5GtjVS1MUP4HUahXzfn7g7kVA60fSKeC71iJpWAZK53ytB5R0QIqTmFA'
            },
            'attachmentInfos': [
                {
                    'id':1,
                    'name':'email.eml'
                },
                {
                    'id':'AAMkADI0MTZkOTE3LWNkZDItNGVmNC04ZDIxLWZlOWU1YTJmYmIyOQBGAAAAAACoSXYdZ8juQK7Vqjdn60EpBwAKEvyJ/6KYSLziaZ29LGlPAAAAAAEMAAAKEvyJ/6KYSLziaZ29LGlPAAA1EsrAAAABEgAQAJsxiGrCGw5Dq9YVFmKQbWY=',
                    'name':'overlay-avatars-1463072120796'
                }
            ]
        };
        spyOn(streamApi, 'serializer').and.callThrough();
        $httpBackend.whenPOST()
        .respond(function(method, url, data, headers) {
            expect(headers['Content-Type']).toEqual('application/x-www-form-urlencoded;charset=utf-8');
            expect(streamApi.serializer).toHaveBeenCalledWith(longParams);
            expect(method).toEqual(streamApi.Methods.POST);
            expect(data).toEqual(streamApi.serializer(longParams));
            return {};
        });
        streamApi.request('url', undefined, longParams, '', streamApi.Methods.GET);
        $httpBackend.flush();
    });
});
