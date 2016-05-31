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
        streamApi = streamApiService.getInstance({url: 'https://foo'});
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

    it('should set maek call by correct url', function() {
        var requestedUrl = 'https://foo/attask/api-internal/user?action=getApiKey&password=bar&username=foo';

        $httpBackend.expectPUT(requestedUrl)
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
            expect(result).toEqual(response);
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
