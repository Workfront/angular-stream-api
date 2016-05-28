/* eslint-env jasmine */

'use strict';

var angular = require('angular');

describe('report', function() {
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
    
    var streamApi,
        requestSpy;
    beforeEach(function() {
        streamApi = streamApiService.getInstance({url: 'https://foo'});
        requestSpy = spyOn(streamApi, 'request').and.callThrough();
    });

    it('should make call by correct url when called with objCode', function() {
        var requestedUrl = 'https://foo/attask/api-internal/task/report';
        $httpBackend.expect('GET', requestedUrl)
        .respond(200);
        
        streamApi.report('task');
        expect(requestSpy).toHaveBeenCalledWith('task/report', undefined, undefined, undefined, streamApi.Methods.GET);
        $httpBackend.flush();
    });

    it('should make call by correct url when called with objCode and query', function() {
        var requestedUrl = 'https://foo/attask/api-internal/task/report?param1=val1&param2=val2';
        var query = {
            param1: 'val1',
            param2: 'val2'
        };
        $httpBackend.expect('GET', requestedUrl)
        .respond(200);
        
        streamApi.report('task', query);
        expect(requestSpy).toHaveBeenCalledWith('task/report', undefined, query, undefined, streamApi.Methods.GET);
        $httpBackend.flush();
    });
});
