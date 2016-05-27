/* eslint-env jasmine */

'use strict';

var angular = require('angular');

describe('get', function() {
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

    it('should make call by correct url with array of object IDs', function() {
        var requestedUrl = 'https://foo/attask/api-internal/task?ID=12345678&ID=23456789&fields=*,projectID';
        $httpBackend.expect('GET', requestedUrl)
        .respond(200);
        
        streamApi.get('task', ['12345678', '23456789'], ['*', 'projectID']);
        
        $httpBackend.flush();
    });

    it('should make call by correct url with single element in IDs array', function() {
        var requestedUrl = 'https://foo/attask/api-internal/task?ID=12345678&fields=*,projectID';
        $httpBackend.expect('GET', requestedUrl)
        .respond(200);
        
        streamApi.get('task', ['12345678'], ['*', 'projectID']);
        
        $httpBackend.flush();
    });

    it('should make call by correct url with string ID', function() {
        var requestedUrl = 'https://foo/attask/api-internal/task?ID=12345678&fields=*,projectID';
        $httpBackend.expect('GET', requestedUrl)
        .respond(200);
        
        streamApi.get('task', '12345678', ['*', 'projectID']);
        
        $httpBackend.flush();
    });
});
