/* eslint-env jasmine */

'use strict';

var angular = require('angular');

describe('count', function() {
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
        var requestedUrl = 'https://foo/attask/api-internal/task/count?name=some+task+name&name_Mod=cicontains';
        var data = {count: 1};
        $httpBackend.whenGET(requestedUrl)
        .respond(200);
        var query = {};
        query['name'] = 'some task name';
        query['name' + streamApi.Constants.MOD] = streamApi.Constants.Operators.CICONTAINS;
        streamApi.count('task', query);

        $httpBackend.flush();
    });


    it('should fail when response not correct', function(done) {
        var response = {aaa:3};
        var errorHander = jasmine.createSpy('errorHandler');
        $httpBackend.whenGET()
        .respond(200, response);
        streamApi.count('task', {})
        .catch(errorHander)
        .finally(function() {
            expect(errorHander).toHaveBeenCalled();
            done();
        });
        
        $httpBackend.flush();
    });
    
    it('should extract correct count from returend data', function(done) {
        var data = { count: 5 };
        $httpBackend.expectGET()
        .respond(200, data);
        streamApi.count('task', {})
        .then(function(count) {
            expect(count).toBe(data.count);
            done();
        });
        
        $httpBackend.flush();
    });
});
