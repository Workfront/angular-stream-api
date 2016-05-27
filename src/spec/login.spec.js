/* eslint-env jasmine */

'use strict';

var angular = require('angular');

describe('login', function() {
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

    it('should make call to correct url', function() {
        var requestedUrl = /https:\/\/foo\/attask\/api-internal\/login/;
        var headersData = function(headers) {
            return true;
        };
        
        $httpBackend.expectPOST(requestedUrl, /.*/, headersData, [])
        .respond(200);
        streamApi.login('username', 'password');
        
        $httpBackend.flush();
    });
});
