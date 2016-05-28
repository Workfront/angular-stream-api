/* eslint-env jasmine */

'use strict';

var angular = require('angular');

describe('remove', function() {
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

    it('should make call by correct url when called without force', function() {
        var requestedUrl = 'https://foo/attask/api-internal/task/12345678';
        $httpBackend.expectDELETE(requestedUrl)
        .respond(200);
        
        streamApi.remove('task', '12345678');
        expect(requestSpy).toHaveBeenCalledWith('task/12345678', undefined, undefined, undefined, streamApi.Methods.DELETE);
        $httpBackend.flush();
    });

    it('should make call by correct url when called with force', function() {
        var requestedUrl = 'https://foo/attask/api-internal/task/12345678?force=true';
        var params = {force: true};
        $httpBackend.expectDELETE(requestedUrl)
        .respond(200);
        
        streamApi.remove('task', '12345678', true);
        expect(requestSpy).toHaveBeenCalledWith('task/12345678', undefined, params, undefined, streamApi.Methods.DELETE);
        $httpBackend.flush();
    });
});
