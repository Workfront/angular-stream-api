/* eslint-env jasmine */

'use strict';

var angular = require('angular');

describe('search', function() {
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
        streamApi = streamApiService.getInstance({url: 'https://foo'});
    });

    it('should make call by correct url', function() {
        var requestedUrl = 'https://foo/attask/api-internal/task/search';
        $httpBackend.expect('GET', requestedUrl)
        .respond(200);
        
        streamApi.search('task', {}, []);
        
        $httpBackend.flush();
    });

    it('should make call by correct url when passed params', function() {
        var requestedUrl = 'https:\/\/foo\/attask\/api-internal\/task\/search?name=some+name&projectID=12345678';
        var params = {
            name: 'some name',
            projectID: '12345678'
        };
        $httpBackend.expect('GET', requestedUrl)
        .respond(200);

        streamApi.search('task', params);
        $httpBackend.flush();
    });

    it('should make call by correct url when passed params and fields', function() {
        var requestedUrl = 'https://foo/attask/api-internal/task/search?fields=*,somereference:somefield,otherreference:*&name=some+name&projectID=12345678';
        var params = {
            name: 'some name',
            projectID: '12345678'
        };
        var fields = [
            '*',
            'somereference:somefield',
            'otherreference:*'
        ];
        
        $httpBackend.expect('GET', requestedUrl)
        .respond(200);

        streamApi.search('task', params, fields);
        $httpBackend.flush();
    });
});
