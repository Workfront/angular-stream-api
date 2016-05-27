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

    var streamApiService;
    beforeEach(function() {
        angular.mock.inject(function(_streamApiService_) {
            streamApiService = _streamApiService_;
        });
    });
    
    var StreamApi;
    beforeEach(function() {
        StreamApi = streamApiService.getInstance({url:'http://foo'});
    });

    it('should setup config correctly when passed task as path and method', function() {
        StreamApi.request('task', null, null, null, StreamApi.Methods.GET);
        expect(StreamApi.config.url).toBe('http://foo/attask/api-internal/task');
        expect(StreamApi.config.method).toBe(StreamApi.Methods.GET);
    });

    it('should set correct url when passed /task as path', function() {
        StreamApi.request('task', null, null, null, StreamApi.Methods.GET);
        expect(StreamApi.config.url).toBe('http://foo/attask/api-internal/task');
    });

    it('should throw when not passed data on method POST', function() {
        expect(function() {StreamApi.request('task', null, null, null, StreamApi.Methods.POST);})
            .toThrow(new Error('You must specify \'data\' in case you have used PUT or POST'));
    });

    it('should throw when not passed data on method PUT', function() {
        expect(function() {StreamApi.request('task', null, null, null, StreamApi.Methods.PUT);})
            .toThrow(new Error('You must specify \'data\' in case you have used PUT or POST'));
    });

    it('should throw when passed data and method not equal to POST or PUT', function() {
        expect(function() {StreamApi.request('task', {}, null, null, StreamApi.Methods.GET);})
            .toThrow(new Error('You must specify method PUT or POST in case have passed \'data\''));
    });

    it('should set config.headers to Content-Type: application/json when method is POST', function() {
        StreamApi.request('task', {}, null, null, StreamApi.Methods.POST);
        expect(StreamApi.config.headers['Content-Type']).toBe('application/json;charset=utf-8');
    });

    it('should set config.headers to Content-Type: application/json when method is PUT', function() {
        StreamApi.request('task', {}, null, null, StreamApi.Methods.PUT);
        expect(StreamApi.config.headers['Content-Type']).toBe('application/json;charset=utf-8');
    });
});
