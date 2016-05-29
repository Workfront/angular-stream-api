/* eslint-env jasmine */

'use strict';

var angular = require('angular');

describe('metadata', function() {
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
    
    var streamApi,
        requestSpy;
    beforeEach(function() {
        streamApi = streamApiService.getInstance({url: 'https://foo'});
        requestSpy = spyOn(streamApi, 'request').and.callThrough();
    });

    it('should make call by correct url when not passed objeCode', function() {
        var requestedUrl = 'https://foo/attask/api-internal/metadata';
        $httpBackend.expect('GET', requestedUrl)
        .respond(200);
        
        streamApi.metadata();
        expect(requestSpy).toHaveBeenCalledWith('/metadata', undefined, undefined, undefined, streamApi.Methods.GET);
        $httpBackend.flush();
    });

    it('should make call by correct url when passed objeCode', function() {
        var requestedUrl = 'https://foo/attask/api-internal/task/metadata';
        $httpBackend.expect('GET', requestedUrl)
        .respond(200);
        
        streamApi.metadata('task');
        expect(requestSpy).toHaveBeenCalledWith('task/metadata', undefined, undefined, undefined, streamApi.Methods.GET);
        $httpBackend.flush();
    });
});
