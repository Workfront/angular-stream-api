/* eslint-env jasmine */

'use strict';

var angular = require('angular');

describe('login', function() {
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

    it('should make call to correct url', function() {
        var requestedUrl = /https:\/\/foo\/attask\/api-internal\/login/;

        $httpBackend.expectPOST(requestedUrl)
        .respond(200);
        streamApi.login('username', 'password');
        
        $httpBackend.flush();
    });

    it('should store session ID after successful login', function() {
        var requestedUrl = /https:\/\/foo\/attask\/api-internal\/login/;
        var response = {
            data: {
                sessionID: '12345678'
            }
        };

        $httpBackend.expectPOST(requestedUrl, /.*/)
        .respond(200, response);
        streamApi.login('username', 'password');
        
        $httpBackend.flush();
        
        expect(streamApi.options.headers.sessionID).toBe('12345678');
    });
});
