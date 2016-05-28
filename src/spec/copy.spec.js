/* eslint-env jasmine */

'use strict';

var angular = require('angular');

describe('copy', function() {
    beforeEach(function() {
        var ngModule = angular.module('mockModule', []);
        require('./../ApiServiceProvider')(ngModule);
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
