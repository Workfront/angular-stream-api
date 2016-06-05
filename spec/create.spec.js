/* eslint-env jasmine */

'use strict';

var angular = require('angular');

describe('create', function() {
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
            streamApi.create(undefined, {});
        }).toThrow(new Error('You must provide at least objCode and data'));
    });
    
    it('should throw an error when data is not provided', function() {
        expect(function() {
            streamApi.create('task', undefined);
        }).toThrow(new Error('You must provide at least objCode and data'));
    });

    it('should make call to correct url', function() {
        var requestedUrl = 'https://foo/attask/api-internal/task';
        $httpBackend.expectPOST(requestedUrl)
        .respond(200);
        streamApi.create('task', {});
        
        $httpBackend.flush();
    });

    it('should have correct data in request', function() {
        var data = {
            name: 'some task name',
            projectID: '12345678'
        };
        
        $httpBackend.expectPOST(/.*/, data)
        .respond(200);
        streamApi.create('task', data);
        
        $httpBackend.flush();
    });

    it('should set correct headers', function() {
        var headerData = function(headers) {
            return headers['Content-Type'] === 'application/json;charset=utf-8';
        };
        
        $httpBackend.expectPOST(/.*/, /.*/, headerData)
        .respond(200);
        streamApi.create('task', {});
        
        $httpBackend.flush();
    });
});
