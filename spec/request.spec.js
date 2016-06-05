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
        .respond(200, function(url, data, headers) {
            expect(headers).toBe(passedHeaders);
        });
        streamApi.request('url', {}, {}, '', streamApi.Methods.POST);
        $httpBackend.flush();
    });
});
