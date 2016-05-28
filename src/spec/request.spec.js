/* eslint-env jasmine */

'use strict';

var angular = require('angular');

describe('request', function() {
    
    beforeEach(function() {
        var ngModule = angular.module('mockModule', []);
        require('./../ApiServiceProvider')(ngModule);
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
        streamApi = streamApiService.getInstance({url:'http://foo'});
    });

    it('should setup config correctly when passed task as path and method', function() {
        streamApi.request('task', null, null, null, streamApi.Methods.GET);
        expect(streamApi.config.url).toBe('http://foo/attask/api-internal/task');
        expect(streamApi.config.method).toBe(streamApi.Methods.GET);
    });

    it('should set correct url when passed /task as path', function() {
        streamApi.request('task', null, null, null, streamApi.Methods.GET);
        expect(streamApi.config.url).toBe('http://foo/attask/api-internal/task');
    });

    it('should throw when not passed data on method POST', function() {
        expect(function() {streamApi.request('task', null, null, null, streamApi.Methods.POST);})
            .toThrow(new Error('You must specify \'data\' in case you have used POST'));
    });

    it('should throw when passed data and method not equal to POST or PUT', function() {
        expect(function() {streamApi.request('task', {}, null, null, streamApi.Methods.GET);})
            .toThrow(new Error('You must specify method PUT or POST in case you have passed \'data\''));
    });

    it('should set config.headers to Content-Type: application/json when method is POST', function() {
        streamApi.request('task', {}, null, null, streamApi.Methods.POST);
        expect(streamApi.config.headers['Content-Type']).toBe('application/json;charset=utf-8');
    });

    it('should add to config.headers Content-Type: application/json when method is PUT', function() {
        streamApi.request('task', {}, null, null, streamApi.Methods.PUT);
        expect(streamApi.config.headers['Content-Type']).toBe('application/json;charset=utf-8');
    });

    it('should add to config.headers sessionID from \'data\' when logged in and will use it for subsequent calls', function(done) {
        var sessionID = '12345678';
        var loginData = {
            data: {
                sessionID: sessionID
            }
        };
        $httpBackend.whenPOST(/.*/)
        .respond(200, loginData);
        $httpBackend.whenGET()
        .respond(200);
        $httpBackend.whenGET()
        .respond(200);
        streamApi.login('username', 'password')
        .then(function(data) {
            expect(streamApi.options.headers.sessionID).toBe(data.data.sessionID);
            streamApi.request('task', undefined, undefined, undefined, streamApi.Methods.GET);
            expect(streamApi.config.headers.sessionID).toBe(sessionID);
            streamApi.request('task', undefined, undefined, undefined, streamApi.Methods.GET);
            expect(streamApi.config.headers.sessionID).toBe(sessionID);
            done();
        });

        $httpBackend.flush();
    });
});
