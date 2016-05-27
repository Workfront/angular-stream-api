/* eslint-env jasmine */

'use strict';

var angular = require('angular');

describe('logout', function() {
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
        var requestedUrl = /https:\/\/foo\/attask\/api-internal\/logout/;

        $httpBackend.expectGET(requestedUrl)
        .respond(200);
        streamApi.logout();
        
        $httpBackend.flush();
    });

    it('should remove sessionID from headers', function(done) {
        var data = {
            success: true
        };
        $httpBackend.expectGET(/.*/)
        .respond(200, data);
        streamApi.options.sessionID = '12345678';
        streamApi.logout()
        .then(function() {
            expect(streamApi.options.sessionID).toBeUndefined();
            done();
        });
        
        $httpBackend.flush();
    });

    it('should not remove sessionID  and should reject promise if request doesn\'t contain success: true', function(done) {
        var data = {
            success: false
        };
        $httpBackend.expectGET(/.*/)
        .respond(200, data);
        var sessionID = '12345678';
        streamApi.options.sessionID = sessionID;
        streamApi.logout()
        .catch(function() {
            expect(streamApi.options.sessionID).toBe(sessionID);
            done();
        });
        
        $httpBackend.flush();
    });

    it('should not do anything', function(done) {
        $httpBackend.expectGET(/.*/)
        .respond(500);
        var sessionID = '12345678';
        streamApi.options.sessionID = sessionID;
        streamApi.logout()
        .catch(function() {
            expect(streamApi.options.sessionID).toBe(sessionID);
            done();
        });
        
        $httpBackend.flush();
    });
});
