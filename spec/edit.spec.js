/* eslint-env jasmine */

'use strict';

var angular = require('angular');

describe('edit', function() {
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

    it('should make call to correct url', function() {
        var requestedUrl = 'https://foo/attask/api-internal/task';
        $httpBackend.expectPUT(requestedUrl)
        .respond(200);
        streamApi.edit('task', '12345678', {});
        
        $httpBackend.flush();
    });

    it('should have correct data in request when passed objID as string', function() {
        var data = {
                name: 'some task name'
            },
            objID = '12345678';
        $httpBackend.expectPUT(/.*/, angular.extend({}, data, {ID: objID}))
        .respond(200);
        streamApi.edit('task', objID, data);
        
        $httpBackend.flush();
    });

    it('should have correct data in request when passed objID as string', function() {
        var data = {
                name: 'some task name'
            },
            objID = '12345678';
        data.ID = objID;
        $httpBackend.expectPUT(/.*/, data)
        .respond(200);
        streamApi.edit('task', objID, data);
        
        $httpBackend.flush();
    });

    it('should set correct headers', function() {
        var headerData = function(headers) {
            return headers['Content-Type'] === 'application/json;charset=utf-8';
        };
        
        $httpBackend.expectPUT(/.*/, /.*/, headerData)
        .respond(200);
        streamApi.edit('task', '12345678', {});
        
        $httpBackend.flush();
    });

    it('should throw when data doesn\'t passed', function() {
        expect(function() {
            streamApi.edit('task', {ID: '12345678'});
        }).toThrow(new Error('You must provide edit data object as \'data\' argument'));
        
    });

    it('should throw when objID is not string', function() {
        expect(function() {
            streamApi.edit('task', 12345678, {});
        }).toThrow(new Error('You must provide either \'ojbID\' of type string or \'data\' with property ID'));
        
    });

    it('should throw when objID doesn\'t provided and data hasn\'t property ID', function() {
        expect(function() {
            streamApi.edit('task', undefined, {});
        }).toThrow(new Error('You must provide either \'ojbID\' of type string or \'data\' with property ID'));
        
    });
});
