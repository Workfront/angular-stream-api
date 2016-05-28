/* eslint-env jasmine */

'use strict';

var angular = require('angular');

describe('execute', function() {
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

    it('should make call to correct url when passed ID', function() {
        var requestedUrl = 'https://foo/attask/api-internal/task/12345678/someAction';
        $httpBackend.expectPUT(requestedUrl)
        .respond(200);
        streamApi.execute('task', '12345678', 'someAction', {});
        
        $httpBackend.flush();
    });

    it('should make call to correct url when not passed ID', function() {
        var requestUrl = 'https://foo/attask/api-internal/task?ID=12345678&action=someAction';
        $httpBackend.expectPUT(requestUrl, undefined, undefined, ['action', 'ID'])
        .respond(200);
        streamApi.execute('task', null, 'someAction', {ID: '12345678'});
        
        $httpBackend.flush();
    });
});
